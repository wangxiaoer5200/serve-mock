/*
 * @description: 获取api接口地址
 * @author: wangxiaoer
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:26:22
 * @email: 1980738748@qq.com
 */
const fetchApiMethods = require.context('./', true, /^((?!index).)*(\.ts)$/);
interface Modules {
  [propName: string]: any;
}
const modules: Modules = {};
fetchApiMethods.keys().forEach((key: any) => {
  if (key) {
    const module = fetchApiMethods(key);
    key = key.replace(/^\.\//, '').replace(/\.ts$/, '');
    if (key.includes('/')) {
      key = key.split('/').pop();
    }
    Object.keys(module).forEach((mod) => {
      modules[key] = modules[key] || {};
      if (mod !== 'default') {
        modules[key][mod] = module[mod];
      } else {
        modules[key] = { ...modules[key], ...module['default'] };
      }
    });
  }
});
const install = (vue: any) => {
  vue.prototype.$api = {
    ...modules,
  };
};

export default {
  install,
};
