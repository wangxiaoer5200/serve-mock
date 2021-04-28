interface AnyObject {
  [propName: string]: any;
}
// 将json转tree
export function json2Tree(
  data: any,
  { id = 'id', parentId = 'parentId', children = 'children' } = {},
  parentIdRoot: number = -1,
): any {
  let tree = [];
  let childrenOf: AnyObject = {};
  let item, idKey, parentIdKey;

  for (let i = 0, length = data.length; i < length; i++) {
    item = data[i];
    idKey = item[id];
    parentIdKey = item[parentId] || parentIdRoot;
    childrenOf[idKey] = childrenOf[idKey] || [];
    item[children] = childrenOf[idKey];
    if (parentIdKey !== parentIdRoot) {
      childrenOf[parentIdKey] = childrenOf[parentIdKey] || [];
      childrenOf[parentIdKey].push(item);
    } else {
      tree.push(item);
    }
  }
  return tree;
}
interface DataChildren {
  data: any[];
  children?: string;
}
// 扁平化
export function flatTreeData(
  opt: DataChildren = {
    data: [],
  },
) {
  const { data, children = 'children' } = opt;
  const flatArr: Array<any> = [];
  const setItem = (data: any, children: string) => {
    if (!data && !Array.isArray(data)) return;
    for (const item of data) {
      flatArr.push(item);
      if (item[children]) {
        setItem(item[children], children);
      }
    }
  };
  setItem(data, children);
  return flatArr;
}
