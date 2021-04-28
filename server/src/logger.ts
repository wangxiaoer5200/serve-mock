/*
 * @description: 日志处理文件
 * @author: wangxiaoer
 * @Date: 2021-04-25 13:29:33
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:32:12
 */
import logger4 from 'koa-log4';
logger4.configure({
  appenders: { out: { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'debug' } },
});
export default (moduleName: string) => {
  return logger4.getLogger(moduleName);
};
