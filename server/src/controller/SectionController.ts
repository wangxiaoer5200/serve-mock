/*
 * @description: UI界面-增删改查模块相关校验
 * @author: wangxiaoer
 * @Date: 2021-04-25 14:26:13
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:33:21
 */
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import {
  createValidate,
  updateValidate,
  pageValidate,
  pathNameValidate,
} from '../validate/SectionValidate';
import * as SectionService from '../service/SectionService';

// 新增接口
export async function createSection(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = createValidate(ctx);
  if (!valid) {
    return;
  }
  await SectionService.createSection(ctx, ctx.request.body);
}

// 详情接口
export async function getSectionDetail(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = pathNameValidate(ctx);
  if (!valid) {
    return;
  }
  await SectionService.getSectionDetail(ctx, ctx.request.body);
}

// 更新接口
export async function updateSection(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = updateValidate(ctx);
  if (!valid) {
    return;
  }
  await SectionService.updateSection(ctx, ctx.request.body);
}

// 删除接口
export async function deleteSection(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = pathNameValidate(ctx);
  if (!valid) {
    return;
  }
  await SectionService.deleteSection(ctx, ctx.request.body);
}

// 获取接口列表，带分页
export async function getSectionList(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  const valid = pageValidate(ctx);
  if (!valid) {
    return;
  }
  await SectionService.getSectionList(ctx, ctx.request.body);
}
