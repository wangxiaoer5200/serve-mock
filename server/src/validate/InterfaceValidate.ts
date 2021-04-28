/*
 * @description: UI界面接口-增删改查参数校验
 * @author: wangxiaoer
 * @Date: 2021-04-2516:14:54
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:35:11
 */

import { validate } from '../utils/ValidUtil';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import Joi from 'joi';
import { MethodEnum, StatusEnum } from '../enum/InterfaceEnum';
const methodValidate = Joi.string()
  .valid(
    MethodEnum.GET,
    MethodEnum.POST,
    MethodEnum.PUT,
    MethodEnum.DELETE,
    MethodEnum.OPTIONS,
    MethodEnum.PATCH,
    MethodEnum.HEAD
  )
  .default(MethodEnum.POST);

const statusValidate = Joi.number()
  .valid(
    StatusEnum.SUCCESS,
    StatusEnum.REDIRECT,
    StatusEnum.FORBIDDEN,
    StatusEnum.SERVERERROR,
    StatusEnum.BADGATEWAY,
    StatusEnum.UNAVAILABLE,
    StatusEnum.TIMEOUT
  )
  .default(StatusEnum.SUCCESS);

const resValidate = Joi.array().items(
  Joi.object().keys({
    id: Joi.number().required(),
    parentId: Joi.number().required(),
    name: Joi.string(),
    required: Joi.boolean(),
    type: Joi.string()
      .valid('String', 'Number', 'Boolean', 'Object', 'Array', 'RegExp', 'Function', 'Null')
      .required(),
    rule: Joi.string().allow(''),
    value: Joi.string().allow(''),
    description: Joi.string().allow(''),
  })
);

/**
 * @description: 分页参数
 * @Date: 2021-04-25 17:15:45
 */
export function pageValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      pathName: Joi.string().required(),
      page: Joi.number(),
      size: Joi.number(),
      isPage: Joi.boolean().required(),
    },
    ctx
  );
}

/**
 * @description: 新增接口参数
 * @Date: 2021-04-25 11:11:15
 */
export function createValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      pathName: Joi.string().required(),
      name: Joi.string().required(),
      url: Joi.string().required(),
      method: methodValidate,
      status: statusValidate,
      description: Joi.string().allow(''), // 非必填，可为空
    },
    ctx
  );
}

/**
 * @description: 修改接口参数
 * @Date: 2021-04-25 13:27:20
 */
export function updateValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      id: Joi.number().required(), // id必填
      pathName: Joi.string().required(), // 所属模块的pathName
      name: Joi.string().required(),
      url: Joi.string().required(),
      method: methodValidate,
      status: statusValidate,
      description: Joi.string().allow(''),
      request: resValidate,
      response: resValidate,
    },
    ctx
  );
}

/**
 * @description:  url和pathName必填
 * @Date: 2021-04-25 18:13:31
 */
export function urlAndPatnameValidate(ctx: ParameterizedContext<DefaultState, DefaultContext>) {
  return validate(
    ctx.request.body,
    {
      url: Joi.string().required(),
      pathName: Joi.string().required(),
    },
    ctx
  );
}
