/*
 * @description: UI界面接口-校验成功后处理
 * @author: wangxiaoer
 * @Date: 2021-04-25 17:43:55
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:33:50
 */
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { PageInfo, CreateInfo, UpdateInfo } from '../types/interface.d';
import Result from '../utils/ResultUtil';
import { readFile, writeFile, unlink, readdir, rename } from '../utils/FileHandle';
import path from 'path';
import { pathNameCheck, urlCheck } from '../utils/FieldCheck';
import { getListData } from '../utils/DataHandle';
import { readJson } from '../api/mock/index';

const rootPath = path.join(__dirname, '../../'); // server目录

// 新增接口
export async function createData(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: CreateInfo
) {
  const { pathName, url } = data;
  // 判断pathName是否存在
  if (!(await pathNameCheck(pathName))) {
    ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
    return;
  }
  // 判断url是否重复
  const dataList = await getListData('public/' + pathName, ctx); // 获取接口列表
  for (let i = 0; i < dataList['list'].length; i++) {
    if (url === dataList['list'][i].url) {
      ctx.body = Result.errorParam('该接口url已存在！');
      return;
    }
  }
  // 新增json文件
  const fileName = url.replace(/\//g, '-').substr(1);
  const id = new Date().getTime(); // 给新增的记录加唯一id(时间戳)，并且新增json文件以该id命名
  const result = {
    id: id,
    ...data,
  };
  await writeFile(
    rootPath + 'public/' + pathName + '/' + fileName + '.json',
    JSON.stringify(result),
    async () => {
      await readJson();
      ctx.body = Result.success(result, '新增接口成功'); //返回新增这条数据的内容
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 详情接口
export async function getDetailData(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: {
    url: string;
    pathName: string;
  }
) {
  const { url, pathName } = data;
  // 判断pathName是否存在
  if (!(await pathNameCheck(pathName))) {
    ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
    return;
  }
  const fileName = url.replace(/\//g, '-').substr(1); // url格式处理
  // 判断url是否存在
  if (!(await urlCheck(pathName, fileName))) {
    ctx.body = Result.error('不存在该接口，请核对url是否正确！');
    return;
  }
  // 读取文件获取详情信息
  await readFile(
    rootPath + 'public/' + pathName + '/' + fileName + '.json',
    (data) => {
      ctx.body = Result.success(JSON.parse(data));
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 更新接口
export async function updateData(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: UpdateInfo
) {
  const postData = data;
  const { url, pathName, id } = postData;
  // 判断pathName是否存在
  if (!(await pathNameCheck(pathName))) {
    ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
    return;
  }

  const dataList = await getListData('public/' + pathName, ctx); // 获取接口列表
  for (let i = 0; i < dataList['list'].length; i++) {
    // 找的对应id的接口数据
    if (id === dataList['list'][i].id) {
      let oldUrl = dataList['list'][i].url.replace(/\//g, '-').substr(1); // 旧url格式处理
      let newUrl = url.replace(/\//g, '-').substr(1); // 新url格式处理
      // 判断新的url是否已经存在
      if (oldUrl !== newUrl) {
        await readdir(
          rootPath + 'public/' + pathName,
          async (files) => {
            if (files.includes(newUrl + '.json')) {
              ctx.body = Result.error('该url已存在，请更改！');
              return;
            } else {
              await rename(
                rootPath + 'public/' + pathName + '/' + oldUrl + '.json',
                rootPath + 'public/' + pathName + '/' + newUrl + '.json',
                async () => {
                  // 将修改的内容写入json文件里面
                  await writeFile(
                    rootPath + 'public/' + pathName + '/' + newUrl + '.json',
                    JSON.stringify(postData),
                    async () => {
                      await readJson(); // url如果不一样，需要重新读文件
                      ctx.body = Result.success(postData, '更新接口成功'); // 返回更新的数据内容
                    },
                    async (err) => {
                      ctx.body = Result.errorFile(err);
                    }
                  );
                },
                async (err) => {
                  ctx.body = Result.errorFile(err);
                }
              );
            }
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      } else {
        // 将修改的内容写入json文件里面
        await writeFile(
          rootPath + 'public/' + pathName + '/' + newUrl + '.json',
          JSON.stringify(postData),
          async () => {
            ctx.body = Result.success(postData, '更新接口成功'); // 返回更新的数据内容
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      }
    }
  }
}

// 删除接口
export async function deleteData(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: {
    url: string;
    pathName: string;
  }
) {
  const { url, pathName } = data;
  // 判断pathName是否存在
  if (!(await pathNameCheck(pathName))) {
    ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
    return;
  }
  const fileName = url.replace(/\//g, '-').substr(1); // url格式处理
  // 判断url是否存在
  if (!(await urlCheck(pathName, fileName))) {
    ctx.body = Result.error('不存在该接口，请核对url是否正确！');
    return;
  }
  await unlink(
    rootPath + 'public/' + pathName + '/' + fileName + '.json',
    async () => {
      ctx.body = Result.success(await getListData('public/' + pathName, ctx), '删除接口成功');
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 获取接口列表，带分页
export async function getDataList(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: PageInfo
) {
  const { pathName, page, size, isPage } = data;
  // 判断pathName是否存在
  if (!(await pathNameCheck(pathName))) {
    ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
    return;
  }
  const dataList = await getListData('public/' + pathName, ctx); // 获取接口列表
  if (isPage) {
    // 分页
    if (page && size) {
      const pageList = dataList['list'].slice(size * (page - 1), page * size);
      ctx.body = Result.success({
        list: pageList,
        total: dataList['list'].length,
      });
    } else {
      ctx.body = Result.errorParam('isPage为true,分页的page和size参数必传!');
    }
  } else {
    ctx.body = Result.success(dataList);
  }
}
