/*
 * @description: Do not edit
 * @author: wangxiaoer
 * @Date: 2021-04-25 14:38:27
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:35:34
 */
import { validate } from '../utils/ValidUtil';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import Joi from 'joi';

// 新增接口参数
export function createValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      name: Joi.string().required(),
      pathName: Joi.string().alphanum().min(1).max(30).required(), // 1 - 30 个 数字、字符
      description: Joi.string().allow(''), // 非必填，可为空
    },
    ctx
  );
}

// id必填
export function idValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      id: Joi.number().required(),
    },
    ctx
  );
}

// 修改参数
export function updateValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      id: Joi.number().required(),
      name: Joi.string().required(),
      pathName: Joi.string().alphanum().min(1).max(30).required(),
      description: Joi.string().allow(''),
    },
    ctx
  );
}

// 分页参数
export function pageValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      page: Joi.number(),
      size: Joi.number(),
      isPage: Joi.boolean().required(),
    },
    ctx
  );
}

// pathName必填
export function pathNameValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      pathName: Joi.string().required(),
    },
    ctx
  );
}
