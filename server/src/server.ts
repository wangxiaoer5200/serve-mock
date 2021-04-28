/*
 * @description:  主要处理文件
 * @author: wangxiaoer
 * @Date: 2021-04-25 13:29:33
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:32:21
 */
import Koa from 'koa';
import Logger from 'koa-logger';
import KoaStatic from 'koa-static';
import cors from 'koa2-cors';
import helmet from 'koa-helmet';
// @ts-ignore
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';

import { join } from 'path';
import dayjs from 'dayjs';

// api路由
import { loadRouters } from './api/index';

const app = new Koa();
onerror(app);

const logger = Logger((str) => {
  // 使用日志中间件
  console.log(dayjs().format('YYYY-MM-DD HH:mm:ss') + str);
});

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
// 网络安全
app.use(helmet());
// 日志
app.use(logger);
// 解决跨域
app.use(
  cors({
    // origin: function (ctx) {
    //   return '*'; // 允许来自所有域名请求
    // },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

// 静态资源
app.use(KoaStatic(join(__dirname, '../public')));
// 路由
loadRouters(app);

export default app;
