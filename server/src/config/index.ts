import dev from './dev';
import prod from './prod';
import { Config } from '../types/config';

const env: {
  [key: string]: any;
} = {
  production: prod,
  development: dev,
};
export default Object.assign({}, env[process.env.NODE_ENV || 'development'], {
  // 通用配置
}) as Config;
