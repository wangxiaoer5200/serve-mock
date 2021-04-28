/*
 * @description: Joi校验
 * @author: wangxiaoer
 * @Date: 2021-04-25 17:14:41
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:55
 */

import Joi from 'joi';
import Result from '../utils/ResultUtil';
import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';

interface IKey {
  [key: string]: any;
}
export function validate(
  params: IKey = {},
  schema: IKey = {},
  ctx: ParameterizedContext<DefaultState, DefaultContext>
): boolean {
  const validator = Joi.validate(params, Joi.object().keys(schema), { allowUnknown: true });
  if (validator.error) {
    ctx.body = Result.errorParam(validator.error.message);
    return false;
  }
  return true;
}
