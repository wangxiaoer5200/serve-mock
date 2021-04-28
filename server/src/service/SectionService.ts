import { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { CreateInfo, UpdateInfo, PageInfo } from '../types/section.d';
import Result from '../utils/ResultUtil';
import { readFile, writeFile, mkdir, rename, readdir, unlink, rmdir } from '../utils/FileHandle';
import path from 'path';
import { getListData } from '../utils/DataHandle';
const rootPath = path.join(__dirname, '../../'); // server目录

// 新增接口
export async function createSection(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: CreateInfo
) {
  const { name, pathName, description } = data;
  const id = new Date().getTime(); // 给新增的记录加唯一id(时间戳)，并且新增json文件以该id命名
  const result = {
    id: id,
    name,
    pathName,
    description,
  };
  await readdir(
    rootPath + 'public/sectionList',
    async (files) => {
      // 判断pathName是否重复
      if (files.includes(pathName + '.json')) {
        ctx.body = Result.errorParam('pathName重复，请更改！');
        return;
      }
      // 在sectionList文件夹内新增一个以pathName命名的json文件，存储具体的模块信息
      await writeFile(
        rootPath + 'public/sectionList/' + pathName + '.json',
        JSON.stringify(result),
        async () => {
          // 在sectionList文件夹同级创建一个存放该模块接口以pathName命名的文件夹
          await mkdir(
            rootPath + 'public/' + pathName,
            0o777,
            async () => {
              ctx.body = Result.success(result, '新增模块成功'); //返回新增这条数据的内容
            },
            async (err) => {
              ctx.body = Result.errorFile(err);
            }
          );
        },
        async (err) => {
          ctx.body = Result.errorFile(err);
        }
      );
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 详情接口
export async function getSectionDetail(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: {
    pathName: string;
  }
) {
  const { pathName } = data;
  await readdir(
    rootPath + 'public/sectionList',
    async (files) => {
      // 判断pathName是否存在
      if (files.includes(pathName + '.json')) {
        // 读取对应的json文件
        await readFile(
          rootPath + 'public/sectionList/' + pathName + '.json',
          (data) => {
            if (data) {
              ctx.body = Result.success(JSON.parse(data));
            }
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      } else {
        ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
      }
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 更新接口
export async function updateSection(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: UpdateInfo
) {
  const postData = data;
  const dataList = await getListData('public/sectionList', ctx); // 获取模块列表
  for (let i = 0; i < dataList['list'].length; i++) {
    if (postData.id === dataList['list'][i].id) {
      // pathName不一样，需要将模块接口文件夹以及sectionList底下的json文件重命名
      if (postData.pathName !== dataList['list'][i].pathName) {
        // 判断新的pathName是否已经存在
        await readdir(
          rootPath + 'public/sectionList',
          async (files) => {
            if (files.includes(postData.pathName + '.json')) {
              ctx.body = Result.error('该pathName已存在，请更改！');
              return;
            }
            await rename(
              rootPath + 'public/' + dataList['list'][i].pathName,
              rootPath + 'public/' + postData.pathName,
              async () => {
                await rename(
                  rootPath + 'public/sectionList/' + dataList['list'][i].pathName + '.json',
                  rootPath + 'public/sectionList/' + postData.pathName + '.json',
                  async () => {
                    // 将修改的内容写入json文件里面
                    await writeFile(
                      rootPath + 'public/sectionList/' + postData.pathName + '.json',
                      JSON.stringify(postData),
                      async () => {
                        ctx.body = Result.success(postData, '更新模块成功'); // 返回更新的数据内容
                      },
                      async (err) => {
                        ctx.body = Result.errorFile(err);
                      }
                    );
                  },
                  async (err) => {
                    ctx.body = Result.errorFile(err);
                  }
                );
              },
              async (err) => {
                ctx.body = Result.errorFile(err);
              }
            );
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      } else {
        // 将修改的内容写入json文件里面
        await writeFile(
          rootPath + 'public/sectionList/' + postData.pathName + '.json',
          JSON.stringify(postData),
          async () => {
            ctx.body = Result.success(postData, '更新模块成功'); // 返回更新的数据内容
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      }
    }
  }
}

// 删除接口
export async function deleteSection(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: {
    pathName: string;
  }
) {
  const { pathName } = data;
  await readdir(
    rootPath + 'public/sectionList',
    async (files) => {
      // 判断pathName是否存在
      if (files.includes(pathName + '.json')) {
        // 删除sectionList文件夹下对应的json文件
        await unlink(
          rootPath + 'public/sectionList/' + pathName + '.json',
          async () => {
            // 删除模块接口目录及下面的json文件
            await readdir(
              rootPath + 'public/' + pathName,
              async (data) => {
                const files = data;
                // 1.删除目录下的所有文件
                files.forEach(function (file) {
                  var curPath = rootPath + 'public/' + pathName + '/' + file;
                  unlink(curPath);
                });
                // 2.删除目录
                await rmdir(
                  rootPath + 'public/' + pathName,
                  async () => {
                    ctx.body = Result.success(
                      await getListData('public/sectionList', ctx),
                      '删除模块成功'
                    );
                  },
                  async (err) => {
                    ctx.body = Result.errorFile(err);
                  }
                );
              },
              async (err) => {
                ctx.body = Result.errorFile(err);
              }
            );
          },
          async (err) => {
            ctx.body = Result.errorFile(err);
          }
        );
      } else {
        ctx.body = Result.error('不存在该模块，请核对pathName是否正确！');
      }
    },
    async (err) => {
      ctx.body = Result.errorFile(err);
    }
  );
}

// 获取模块列表，带分页
export async function getSectionList(
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  data: PageInfo
) {
  const { page, size, isPage } = data;
  const dataList = await getListData('public/sectionList', ctx); // 获取模块列表
  if (isPage) {
    // 分页
    if (page && size) {
      const pageList = dataList['list'].slice(size * (page - 1), page * size);
      ctx.body = Result.success({
        list: pageList,
        total: dataList['list'].length,
      });
    } else {
      ctx.body = Result.errorParam('isPage为true,分页的page和size参数必传!');
    }
  } else {
    ctx.body = Result.success(dataList);
  }
}
