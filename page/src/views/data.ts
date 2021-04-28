/*
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 18:23:31
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:24:52
 * @email: 1980738748@qq.com
 */
// import { CreateElement } from 'vue';
import { BASETYPE_LIST } from '@/const/base';
const tableConfig = {
  gridConfig: [
    {
      label: '名称',
      prop: 'name',
      type: 'input',
      minWidth: 120,
      fixedWidth: true,
    },
    { label: '必选', prop: 'required', type: 'checkbox', width: 50 },
    {
      label: '类型',
      prop: 'type',
      type: 'select',
      width: 130,
      options: BASETYPE_LIST,
    },
    { label: '生成规则', prop: 'rule', type: 'input' },
    { label: '初始值', prop: 'value', type: 'input' },
    { label: '简介', prop: 'description', type: 'input' },
    { label: '操作', prop: 'handle', type: 'handle', width: 150 },
  ],
};
export default tableConfig;
