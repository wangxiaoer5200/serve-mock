/*
 * @description: UI界面模块接口-增删改查操作
 * @author: wangxiaoer
 * @Date: 2021-04-25 14:21:58
 * @LastEditors: wangbin
 */

import Router from 'koa-router';
import {
  createSection,
  getSectionDetail,
  updateSection,
  deleteSection,
  getSectionList,
} from '../../controller/SectionController';

const router = new Router({ prefix: '/section' }); // 给路由加前缀

// 新增接口
router.post('/createSection', createSection);

// 详情接口
router.post('/getSectionDetail', getSectionDetail);

// 更新接口
router.post('/updateSection', updateSection);

// 删除接口
router.post('/deleteSection', deleteSection);

// 获取接口列表，带分页
router.post('/getSectionList', getSectionList);

export default router;
