/*
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 12:30:13
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:31:21
 * @email: 1980738748@qq.com
 */
// 基础
export interface BtnConfig {
  create: boolean;
  preview?: boolean;
}
export interface interForm {
  name: string;
  url?: string;
  method?: string;
  status?: number;
  description: string;
}
interface interRuleForm {
  name: any[];
  url: any[];
}

export interface moduleForm {
  id?: number | null;
  name: string;
  pathName: string;
  description: string;
}
interface moduleRuleForm {
  name: any[];
  pathName: any[];
}
