/*
 * @description: 自定义接口调用数据处理方法
 * @author: wangxiaoer
 * @Date: 2021-04-25 15:59:05
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:21
 */
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { readFile, readdir } from './FileHandle';
import path from 'path';
import Result from './ResultUtil';
const serverPath = path.join(__dirname, '../../'); // server目录

//  树形结构数据转换
function toTreeData(jsonData: any) {
  let result = [],
    temp = {},
    i = 0,
    j = 0,
    len = jsonData.length;

  // 以id作为索引存储元素，可以无需遍历直接定位元素
  for (; i < len; i++) {
    temp[jsonData[i]['id']] = jsonData[i];
  }

  for (; j < len; j++) {
    let currentElement = jsonData[j];
    let currentElementParent = temp[currentElement['parentId']]; // 临时变量里面的当前元素的父元素
    if (currentElementParent) {
      // 存在父元素
      if (!currentElementParent['children']) {
        currentElementParent['children'] = [];
      }
      currentElementParent['children'].push(currentElement);
    } else {
      // 不存在父元素，当前元素是一级元素
      result.push(currentElement);
    }
  }
  return result;
}

// 根据类型设置默认值--通过参数type判断，value为空则设置默认值
function typeCheck(type: string) {
  if (type == 'String' || type == 'RegExp' || type == 'Function') {
    return '';
  } else if (type == 'Number') {
    return 1;
  } else if (type == 'Boolean') {
    return false;
  } else if (type == 'Object') {
    return {};
  } else if (type == 'Array') {
    return [];
  } else if (type == 'Null') {
    return null;
  }
}

// 拼接mock规范
function convertData(data) {
  let mockRules = {};
  data.map((item) => {
    if (item.type === 'Object' || item.type === 'Array') {
      if (item.children && item.children.length !== 0) {
        if (item.type === 'Array') {
          mockRules[item.mockName] = [];
          mockRules[item.mockName].push(convertData(item.children));
        } else {
          mockRules[item.mockName] = convertData(item.children);
        }
      } else {
        mockRules[item.mockName] = item.value;
      }
    } else if (item.type === 'Function') {
      try {
        if (item.value && item.value.indexOf('=>') > -1) {
          mockRules[item.mockName] = eval(item.value);
        } else {
          mockRules[item.mockName] = item.value;
        }
      } catch {
        mockRules[item.mockName] = item.value;
      }
    } else if (item.type === 'RegExp') {
      try {
        if (item.value && item.value.indexOf('/') > -1) {
          mockRules[item.mockName] = eval(item.value);
        } else {
          mockRules[item.mockName] = item.value;
        }
      } catch {
        mockRules[item.mockName] = item.value;
      }
    } else if (item.type === 'Number') {
      try {
        const isNumber = /^\d+$/.test(item.value); // 判断是否为数字
        if (isNumber) {
          mockRules[item.mockName] = eval(item.value);
        } else {
          mockRules[item.mockName] = item.value;
        }
      } catch {
        mockRules[item.mockName] = item.value;
      }
    } else if (item.type === 'Boolean') {
      try {
        if (item.value === 'false' || item.value === '0' || item.value === 0) {
          mockRules[item.mockName] = false;
        } else if (
          (item.value && item.value !== 'false' && item.value !== '0' && item.value !== 0) ||
          item.value === 'true'
        ) {
          mockRules[item.mockName] = true;
        } else {
          mockRules[item.mockName] = false;
        }
      } catch {
        mockRules[item.mockName] = item.value;
      }
    } else {
      mockRules[item.mockName] = item.value;
    }
  });
  return mockRules;
}

// mock接口--响应内容格式化
export function formatResponse(data) {
  if (data.response && data.response.length !== 0) {
    for (let j = 0; j < data.response.length; j++) {
      // 设置value默认值
      if (!data.response[j].value) {
        data.response[j].value = typeCheck(data.response[j].type);
      }
      data.response[j].mockName = data.response[j].rule
        ? `${data.response[j].name}|${data.response[j].rule}`
        : `${data.response[j].name}`;
    }
    const treeData = toTreeData(data.response); // 转换为树形结构数据
    const mockRules = convertData(treeData); // 规范拼接为json
    return mockRules;
  } else {
    return [];
  }
}

//  mock接口--请求参数校验
export function formatRequest(
  requestData,
  parms,
  ctx: ParameterizedContext<DefaultState, DefaultContext>
): Boolean {
  let typeSucess: boolean = true;
  let requiredSucess: boolean = true;

  for (var i = 0; i < requestData.length; i++) {
    let keys = []; // 提交的参数名
    // 判断数据类型
    for (var key in parms) {
      keys.push(key);
      // Array和RegExp(字符串)的类型，typeof无法判断，需要特殊处理
      if (key === requestData[i].name) {
        if (typeof parms[key] === 'object' && !isNaN(parms[key].length)) {
          // 传过来的参数是数组
          if (requestData[i].type !== 'Array') {
            ctx.body = Result.errorParam('提交的参数' + requestData[i].name + '类型不对');
            typeSucess = false;
            break;
          } else {
            typeSucess = true;
          }
        } else if (requestData[i].type === 'RegExp') {
          if (typeof parms[key] !== 'string') {
            ctx.body = Result.errorParam('提交的参数' + requestData[i].name + '类型不对');
            typeSucess = false;
            break;
          } else {
            typeSucess = true;
          }
        } else if (typeof parms[key] !== requestData[i].type.toLowerCase()) {
          ctx.body = Result.errorParam('提交的参数' + requestData[i].name + '类型不对');
          typeSucess = false;
          break;
        } else {
          typeSucess = true;
        }
      }
    }

    // 判断必填
    if (requestData[i].required) {
      const isRequired = keys.find((key: any) => key === requestData[i].name);
      if (!isRequired) {
        ctx.body = Result.errorParam('缺少参数' + requestData[i].name);
        requiredSucess = false;
        break;
      } else {
        requiredSucess = true;
      }
    } else {
      requiredSucess = true;
    }
  }
  return typeSucess && requiredSucess;
}

// 获取文件夹下所有json文件的内容，拼接为带total的list
export function getListData(
  path: string,
  ctx?: ParameterizedContext<DefaultState, DefaultContext>
) {
  return new Promise((resolve) => {
    readdir(
      serverPath + path,
      async (files) => {
        let dataList = {
          list: [],
          total: 0,
        };
        if (files && files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            await readFile(serverPath + path + '/' + files[i], async (data) => {
              if (data) {
                dataList.list.push(JSON.parse(data));
              }
            });
          }
          dataList.total = dataList.list.length;
        }
        resolve(dataList);
      },
      async (err) => {
        ctx ? (ctx.body = Result.errorFile(err)) : console.error(err);
      }
    );
  });
}
