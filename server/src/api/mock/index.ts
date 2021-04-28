/*
 * @description: 自定义接口访问
 * @author: wangxiaoer
 * @Date: 2021-04-25 17:14:07
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:32:45
 */
import Router from 'koa-router';
import path from 'path';
import Mock from 'mockjs';
import { readFile, readdir } from '../../utils/FileHandle';
import { formatResponse, formatRequest } from '../../utils/DataHandle';
import Result from '../../utils/ResultUtil';
import { getListData } from '../../utils/DataHandle';

const router = new Router();
const rootPath = path.join(__dirname, '../../../'); // server目录

// 新接口请求
function readJson() {
  readdir(rootPath + 'public/sectionList', async (files) => {
    // 获取所有模块
    if (files && files.length != 0) {
      // 遍历模块
      for (let j = 0; j < files.length; j++) {
        // 读取模块详情数据
        readFile(rootPath + 'public/sectionList/' + files[j], async (data) => {
          let pathName = JSON.parse(data).pathName;
          // 获取接口列表
          const dataList = (await getListData('public/' + pathName))['list'];
          // 遍历接口
          for (let i = 0; i < dataList.length; i++) {
            let url = '/' + pathName + dataList[i].url;
            await router[dataList[i].method.toLowerCase()](url, async (ctx) => {
              // 读取接口详情数据
              let fileUrl =
                rootPath +
                'public/' +
                pathName +
                '/' +
                dataList[i].url.replace(/\//g, '-').substr(1) +
                '.json';
              await readFile(
                fileUrl,
                (data) => {
                  const info = JSON.parse(data.toString()); // 接口的详情数据
                  // 接口传来的参数
                  const parms =
                    dataList[i].method.toLowerCase() == 'get' ? ctx.query : ctx.request.body;
                  // 参数校验
                  let sucess;
                  if (info.request && info.request.length !== 0) {
                    sucess = formatRequest(info.request, parms, ctx);
                  } else {
                    sucess = true;
                  }
                  if (sucess) {
                    // 响应内容
                    const mockRules = formatResponse(info);
                    ctx.body = Mock.mock(mockRules);
                  }
                },
                async (err) => {
                  ctx.body = Result.errorFile(err);
                }
              );
            });
          }
        });
      }
    }
  });
  return true;
}
readJson();

export { readJson };
export default router;
