/*
 * @description:  UI界面接口-增删改查操作
 * @author: wangxiaoer
 * @Date: 2021-04-25 13:29:33
 * @LastEditors: wangbin
 */

import Router from 'koa-router';
import {
  getDataList,
  getDetailData,
  deleteData,
  createData,
  updateData,
} from '../../controller/InterfaceController';

const router = new Router({ prefix: '/interface' }); // 给路由加前缀

// 新增接口
router.post('/createData', createData);

// 详情接口
router.post('/getDetailData', getDetailData);

// 更新接口
router.post('/updateData', updateData);

// 删除接口
router.post('/deleteData', deleteData);

// 获取接口列表，带分页
router.post('/getDataList', getDataList);

export default router;
