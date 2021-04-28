/*
 * @description: fs操作文件方法
 * @author: wangxiaoer
 * @Date: 2021-04-25 10:07:02
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:38
 */

import fs from 'fs';

// 读取文件
export async function readFile(
  url: string,
  callback?: (data: any) => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.readFile(url, 'utf-8', function (err, data) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback(data)) : resolve();
      }
    });
  });
}

// 写入文件
export async function writeFile(
  url: string,
  data: any,
  callback?: (data: any) => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.writeFile(url, data, function (err) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback(data)) : resolve();
      }
    });
  });
}

// 删除文件
export async function unlink(
  url: string,
  callback?: (data: any) => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.unlink(url, function (err) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback('删除成功')) : resolve();
      }
    });
  });
}

// 创建文件夹
export async function mkdir(
  url: string,
  mode: number,
  callback?: () => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.mkdir(url, mode, function (err) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback()) : resolve();
      }
    });
  });
}

// 删除文件夹
export async function rmdir(url: string, callback?: () => void, errCallback?: (data: any) => void) {
  return new Promise((resolve) => {
    fs.rmdir(url, function (err) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback()) : resolve();
      }
    });
  });
}

// 重命名文件夹
export async function rename(
  oldUrl: string,
  newUrl: string,
  callback?: () => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.rename(oldUrl, newUrl, function (err) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        callback ? resolve(callback()) : resolve();
      }
    });
  });
}

// 读取文件夹
export async function readdir(
  url: string,
  callback?: (data: any) => void,
  errCallback?: (data: any) => void
) {
  return new Promise((resolve) => {
    fs.readdir(url, 'utf-8', function (err, data) {
      if (err) {
        errCallback ? resolve(errCallback(err)) : console.error(err);
      } else {
        // 只读取json文件
        const list = []; // 过滤后的数组
        for (let i = 0; i < data.length; i++) {
          if (data[i].indexOf('json') > -1) {
            list.push(data[i]);
          }
        }
        callback ? resolve(callback(list)) : resolve();
      }
    });
  });
}
