import axios from '../utils/axios';

/**
 * @description: 新增模块提交
 * @Date: 2021-04-25 14:36:10
 */
export const createSection = (params: any) =>
  axios.post('/section/createSection', params);
/**
 * @description: 修改模块提交
 * @Date: 2021-04-25 14:36:26
 */
export const updateSection = (params: any) =>
  axios.post('/section/updateSection', params);
/**
 * @description: 获取模块列表
 * @Date: 2021-04-25 15:32:51
 */
export const getSectionList = (params: any) =>
  axios.post('/section/getSectionList', params);
/**
 * @description: 详情模块提交
 * @Date: 2021-04-25 16:13:38
 */
export const getSectionDetail = (params: any) =>
  axios.post('/section/getSectionDetail', params);
/**
 * @description: 删除模块
 * @Date: 2021-04-25 10:31:50
 */
export const deleteSection = (params: any) =>
  axios.post('/section/deleteSection', params);
