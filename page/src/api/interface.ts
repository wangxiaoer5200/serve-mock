import axios from '../utils/axios';

/**
 * @description: 新增接口提交
 * @Date: 2021-04-25 14:36:10
 */
export const createData = (params: any) =>
  axios.post('/interface/createData', params);
/**
 * @description: 修改接口提交
 * @Date: 2021-04-25 14:36:26
 */
export const updateData = (params: any) =>
  axios.post('/interface/updateData', params);
/**
 * @description: 获取接口列表
 * @Date: 2021-04-25 15:32:51
 */
export const getDataList = (params: any) =>
  axios.post('/interface/getDataList', params);
/**
 * @description: 详情接口提交
 * @Date: 2021-04-25 16:13:38
 */
export const getDetailData = (params: any) =>
  axios.post('/interface/getDetailData', params);
/**
 * @description: 删除接口
 * @Date: 2021-04-25 10:31:50
 */
export const deleteData = (params: any) =>
  axios.post('/interface/deleteData', params);
