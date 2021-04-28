/*
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:44:11
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:29:31
 * @email: 1980738748@qq.com
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
export default class App extends VuexModule {
  public baseUrl: string = 'http://localhost:8080/';
  get getBaseUrl(): string {
    return this.baseUrl;
  }
  @Mutation
  private saveBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
  @Action
  public saveBaseUrlFN(params: any) {
    this.saveBaseUrl(params);
    return params;
  }
}
export const AppModule = getModule(App);
