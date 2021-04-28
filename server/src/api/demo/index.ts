/**
 * @description:  示例接口
 * @Date: 2021-04-25 11:38:30
 */
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import Mock from 'mockjs';

const router = new Router({ prefix: '/demo' }); // 给路由加前缀
const rootPath = path.join(__dirname, '../../'); // src目录

// 首页
router.get('/', async (ctx) => {
  ctx.body = 'This is a mock-server!';
});

// 测试get方式
router.get('/getDetail', async (ctx) => {
  console.log(ctx.query); // 请求参数，json
  ctx.body = '请求参数为' + ctx.query.name;
});

// 测试post方式
router.post('/getUpdate', async (ctx) => {
  console.log(ctx.request);
  ctx.body = ctx.request.body;
});

// 读取json文件的mock规范，生成mock数据
router.get('/readJson', async (ctx, next) => {
  let data = fs.readFileSync(rootPath + 'jsonData/dataList.json', 'utf-8'); // 同步读取文件
  ctx.body = Mock.mock(JSON.parse(data));
});

// 追加文件内容
router.post('/appendJson', async (ctx, next) => {
  fs.appendFileSync(rootPath + 'jsonData/dataList.json', JSON.stringify(ctx.request.body));
  ctx.body = '成功追加';
});

// 生成文件
router.get('/saveJson', async (ctx, next) => {
  // 读取dataList.json文件内容，然后写入try.json
  fs.readFile(rootPath + 'jsonData/dataList.json', 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(rootPath + 'jsonData/new.json', data, function (err) {
        console.log('生成成功');
      });
    }
  });
});

// 删除文件
router.get('/delJson', async (ctx, next) => {
  fs.unlink(rootPath + 'jsonData/try.json', function (err) {
    if (err) console.error(err);
    console.log('删除成功');
  });
});

// 读取目录
router.get('/readdir', async (ctx, next) => {
  fs.readdir(rootPath + 'jsonData', function (error, data) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log(data); //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录
  });
});

export default router;
