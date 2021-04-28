<!--
 * @Description: 文件说明
 * @Author: wangbin
 * @Date: 2021-04-25 14:06:53
 * @LastEditTime: 2021-04-26 16:31:39
 * @LastEditors: wangbin
 * @FilePath: \mock-server\server\README.md
-->

# mock 接口服务

## 运行

- `yarn install`: 安装依赖
- `yarn serve`: 运行项目

## 接口访问

#### 自定义 mock 口访问(用于项目开发前端模拟接口使用)

本地项目运行成功后，接口访问格式为 本地 ip 或者`localhost`+ 端口(统一为 6868)+ 所属模块的接口前缀(pathName)+ 所访问接口的接口地址(url)

例如，访问接口前缀为 user 的模块 下的 add 接口，访问地址如下：

```.
http://localhost:6868/user/add
```

#### UI 界面操作接口(用于 UI 界面操作)

相关接口可见接口文档.md 文件，接口访问格式为 本地 ip 或者`localhost`+ 端口(统一为 6868)+ 接口名称(如‘/section/createSection’)

例如，访问创建模块接口，访问地址如下：

```.
http://localhost:6868/section/createSection
```

## 主要目录结构说明

```.
├── public                --存放接口生成的静态数据
├── README.md             --项目说明文件
├── 接口文档.md             --接口说明文件
├── 接口测试用例.md         --接口测试用例说明文件
├── index.ts              --服务启动文件
├── logger.ts             --日志处理文件
├── server.ts             --服务主要处理文件
├── src                   --项目代码目录
├──── api                 --路由相关处理目录
├──── config               --环境配置目录
├──── controller          --接口参数校验目录
├──── enum                --常量目录
├──── service             --接口具体操作处理目录
├──── types               --相关参数的 interface 定义 目录
├──── utils               --工具方法目录
├──── validate            --接口参数校验方法目录
```

## 主要实现逻辑

#### 模块相关接口实现

1. **新增模块**： public/sectionList 下新建以 pathName 命名的 json 文件（以下简称“模块 json 文件”），写入提交的模块相关信息；同时 public/下新建以 pathName 命名的文件夹（以下简称“模块接口文件夹”），用以存放该模块下的接口；
2. **修改模块**： 修改模块 json 文件，对比旧的 pathName，如不一样，需要将模块 json 文件重命名以及模块接口文件夹以新的 pathName 重命名；
3. **获取模块详情**： 找到模块 json 文件，读取文件内容；
4. **删除模块**：删除模块 json 文件和模块接口文件夹(文件夹下的所有文件也需删除)；
5. **获取带分页的模块列表**：获取 public/sectionList 文件夹下的所有 json 文件个数及内容，拼接为带 list 和 total 的对象返回。

#### 接口相关接口实现

1. **新增接口**：根据 pathName 找到对应的模块接口文件夹，创建以 url 命名的 json 文件（以下简称“接口 json 文件”），写入提交的接口相关信息；
2. **修改接口**：修改接口 json 文件，对比旧的 url，如不一样，需要将接口 json 文件以新的 url 重命名；
3. **获取接口详情**： 找到接口 json 文件，读取文件内容；
4. **删除接口**：删除接口 json 文件；
5. **获取带分页的接口列表**：获取 模块接口文件夹下的所有 json 文件个数及内容，拼接为带 list 和 total 的对象返回。

#### 自定义 mock 接口实现

&emsp;&emsp;读取接口 json 文件数据，获取请求参数和响应内容参数。第一步，校验请求的必填参数是否有提交，其次校验提交的参数类型是否正确。第二步，在第一步成功的基础上，对响应内容的数据进行处理，处理为 mock 可接收的对象，然后通过 mock，模拟数据返回。
