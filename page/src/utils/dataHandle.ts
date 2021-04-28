/*
 * @description: 自定义接口调用数据处理方法
 * @author: wangxiaoer
 * @Date: 2021-04-25 15:59:05
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:30:02
 */
interface IKey {
  [key: string]: any;
}
export function typeCheck(type: string, value: any, isShow: boolean) {
  if (type == 'String') {
    return value || '';
  } else if (type == 'Number') {
    if (typeof value === 'number') {
      return Number(value);
    } else {
      return 0;
    }
  } else if (type == 'Boolean') {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  } else if (type == 'RegExp' || type == 'Function') {
    if (isShow) {
      return value;
    } else {
      return eval(value);
    }
    // return isShow ? value : eval(value);
  } else if (type === 'Array') {
    if (!value) {
      return [];
    }
  } else if (type === 'Object') {
    if (!value) {
      return {};
    }
  } else if (type == 'Null') {
    return null;
  }
}

export function mockTransform(data: any) {
  let dataObj: IKey = {},
    key,
    value;
  for (const item of data) {
    key = item.rule ? `${item.name}|${item.rule}` : `${item.name}`;
    if (item.children.length !== 0) {
      if (item.type === 'Array') {
        value = [];
        value.push(mockTransform(item.children));
      } else if (item.type === 'Object') {
        value = mockTransform(item.children);
      }
    } else {
      value = item.value;
    }
    dataObj[key] = value;
  }
  return dataObj;
}

/**
 * 深拷贝数组
 */
import { Map as ImMap, List } from 'immutable';

export const deepClone = (src: any) => {
  if (!src) {
    return src;
  }
  return Array.isArray(src) ? List(src).slice(0).toJS() : ImMap(src).toJSON();
};
