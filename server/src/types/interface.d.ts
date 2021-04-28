/*
 * @description: Do not edit
 * @author: wangxiaoer
 * @Date: 2021-04-25 22:51:34
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:06
 */
// 新增接口参数信息
export interface CreateInfo {
  pathName: string; // 所属模块的pathName
  name: string; // 接口名
  url: string; // 接口地址
  method: string; // 接口请求方式
  status: number; // 状态码
  description: string; // 接口描述
}

// 更新接口参数信息
interface UpdateItem {
  id: number;
  parentId: number;
  name: string; // 字段名
  required: boolean; // 是否必填
  type: string; // 字段类型
  rule: string; // 生成规则
  value: string; // 初始值
  description: string; // 字段描述
}
export interface UpdateInfo {
  id: number;
  pathName: string; // 所属模块的pathName
  name: string; // 接口名
  url: string; // 接口地址
  method: string; // 接口请求方式
  status: number; // 状态码
  description: string; // 接口描述
  request: UpdateItem[]; // 请求参数内容-数组
  response: UpdateItem[]; // 接口返回内容-数组
}

// 分页信息
export interface PageInfo {
  pathName: string; // 所属模块的pathName
  page: number; // 当前页数
  size: number; // 每页显示条数
  isPage: boolean; // 是否分页
}
