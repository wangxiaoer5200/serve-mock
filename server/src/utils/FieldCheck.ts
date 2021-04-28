/*
 * @description: 字段校验是否重复
 * @author: wangxiaoer
 * @Date: 2021-04-25 14:58:47
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:29
 */
import { readdir } from './FileHandle';
import path from 'path';
const rootPath = path.join(__dirname, '../../'); // server目录

// 新增模块接口，校验pathName是否已存在
export async function pathNameCheck(pathName: string) {
  return new Promise((resolve) => {
    readdir(rootPath + 'public/sectionList', async (files) => {
      if (files.includes(pathName + '.json')) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

// 校验url是否已存在
export async function urlCheck(pathName: string, url: string) {
  return new Promise((resolve) => {
    readdir(rootPath + 'public/' + pathName, async (files) => {
      if (files.includes(url + '.json')) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
