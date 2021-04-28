/*
 * @description: axios 配置文件
 * @author: wangxiaoer
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:30:17
 * @email: 1980738748@qq.com
 */
// import { AppModule } from '@/store/modules/app';
// const baseUrl: string = AppModule.getBaseUrl;
const baseUrl: string =
  localStorage.getItem('url') || `${process.env.VUE_APP_BASE_TARGET}`;
// const baseUrl: string = `${process.env.VUE_APP_BASE_TARGET}`;
interface Options {
  [propName: string]: any;
}
export default class AxiosOptions {
  public defaultConfig: Options | undefined = undefined;
  public baseUrl: string = '';
  public config: Options | undefined = undefined;
  public urlPrefix: string = '';
  public tokenPrefix: string = '';
  constructor(options: Options = {}) {
    const { baseUrl: url, urlPrefix = '', tokenPrefix = '' } = options;
    // todo 请求前缀
    this.urlPrefix = urlPrefix;
    this.tokenPrefix = tokenPrefix;
    this.setBaseUrl(url);
    this.init(options);
  }
  init(options: Options) {
    this.defaultConfig = {
      baseURL: this.getBaseUrl(),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      // 超时设置
      timeout: 30000,
      // 跨域是否带Token
      responseType: 'json',
      // 是否携带cookie信息,
      withCredentials: false,
      // ...options
    };
    this.setConfig(options);
  }
  setBaseUrl(url: string) {
    this.baseUrl = url || baseUrl;
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  setConfig(options: Options) {
    this.config = Object.assign({}, this.defaultConfig, options);
  }
  getConfig() {
    return this.config;
  }
  getOtherConfig() {
    const { urlPrefix, tokenPrefix } = this;
    return { urlPrefix, tokenPrefix };
  }
}
