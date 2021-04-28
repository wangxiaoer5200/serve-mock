/*
 * @description: UI界面-增删改查接口相关校验
 * @author: wangxiaoer
 * @Date: 2021-04-25 17:30:55
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:33:13
 */
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import {
  pageValidate,
  createValidate,
  updateValidate,
  urlAndPatnameValidate,
} from '../validate/InterfaceValidate';
import * as InterfaceService from '../service/InterfaceService';

// 新增接口
export async function createData(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = createValidate(ctx);
  if (!valid) {
    return;
  }
  await InterfaceService.createData(ctx, ctx.request.body);
}

// 详情接口
export async function getDetailData(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = urlAndPatnameValidate(ctx);
  if (!valid) {
    return;
  }
  await InterfaceService.getDetailData(ctx, ctx.request.body);
}

// 更新接口
export async function updateData(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = updateValidate(ctx);
  if (!valid) {
    return;
  }
  await InterfaceService.updateData(ctx, ctx.request.body);
}

// 删除接口
export async function deleteData(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = urlAndPatnameValidate(ctx);
  if (!valid) {
    return;
  }
  await InterfaceService.deleteData(ctx, ctx.request.body);
}

// 获取接口列表，带分页
export async function getDataList(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = pageValidate(ctx);
  if (!valid) {
    return;
  }
  await InterfaceService.getDataList(ctx, ctx.request.body);
}
