/*
 * @description: 登录过后注册的组件
 * @author: wangxiaoer
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-25 18:54:36
 * @email: 1980738748@qq.com
 */
import Vue from 'vue';
const requireComponent = require.context(
  '@/components/_global',
  true,
  /\.(vue|js|jsx)$/,
);
requireComponent.keys().forEach((fileName) => {
  // 组件
  const componentConfig = requireComponent(fileName);

  componentConfig &&
    componentConfig.default &&
    componentConfig.default.name &&
    Vue.component(
      componentConfig.default.name,
      componentConfig.default || componentConfig,
    );
});
