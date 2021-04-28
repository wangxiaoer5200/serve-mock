/*
 * @description: 服务启动文件
 * @author: wangxiaoer
 * @Date: 2021-04-25 13:29:33
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:32:02
 */
import server from './server';
import createLogger from './logger';
import envConfig from './config/index';

const { port: _port } = envConfig;
const logger = createLogger('serve');
const port = _port;

// error-handling
server.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

export default server.listen(port, () => {
  logger.info('服务已运行在: http://localhost:' + port);
});
