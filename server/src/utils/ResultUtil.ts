/*
 * @description: 接口返回状态和格式
 * @author: wangxiaoer
 * @Date: 2021-04-25 13:44:13
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:34:46
 */
import { ResultCodeEnum } from '../enum/InterfaceEnum';

export default class Result {
  // 错误信息
  static error(message: string) {
    return {
      success: false,
      message,
      data: null,
      code: ResultCodeEnum.ERROR,
    };
  }

  // 接口超时
  static errorTimeout(message: string, code?: number) {
    return {
      success: false,
      message,
      data: null,
      code: code || ResultCodeEnum.TIMEOUT,
    };
  }

  // 参数错误
  static errorParam(message: string) {
    return {
      success: false,
      data: null,
      message,
      code: ResultCodeEnum.PARAM_ERROR,
    };
  }

  // 成功
  static success(data: any = {}, message: string = 'ok') {
    return {
      success: true,
      message: message,
      data: data,
      code: ResultCodeEnum.SUCCESS,
    };
  }

  // 文件相关错误信息
  static errorFile(message: object) {
    return {
      success: false,
      message,
      data: null,
      code: ResultCodeEnum.FILE_ERROR,
    };
  }
}
