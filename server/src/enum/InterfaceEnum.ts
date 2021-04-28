/**
 * @description: 接口状态码
 * @Date: 2021-04-25 11:26:15
 */
export enum ResultCodeEnum {
  // 成功
  SUCCESS = 200,
  // 参数错误
  PARAM_ERROR = 400,
  // 系统错误
  ERROR = 500,
  // 超时
  TIMEOUT = 408,
  // 文件相关报错
  FILE_ERROR = -1,
}

/**
 * @description: 新增接口method可选项
 * @Date: 2021-04-25 11:30:45
 */
export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
}

/**
 * @description: 新增接status可选项
 * @Date: 2021-04-25 11:38:31
 */
export enum StatusEnum {
  SUCCESS = 200,
  REDIRECT = 301,
  FORBIDDEN = 403,
  SERVERERROR = 500,
  BADGATEWAY = 502,
  UNAVAILABLE = 503,
  TIMEOUT = 504,
}
