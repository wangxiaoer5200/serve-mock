//  新增模块参数信息
export interface CreateInfo {
  name: string; // 模块名
  pathName: string; // 创建的文件夹名称以及调用接口需要加的前缀-必填且只能是英文
  description: string; // 模块描述
}

// 更新模块参数信息
export interface UpdateInfo {
  id: number;
  name: string; // 模块名
  pathName: string;
  description: string; // 模块口描述
}

// 分页参数信息
export interface PageInfo {
  page: number; // 当前页数
  size: number; // 每页显示条数
  isPage: boolean; // 是否分页
}
