import Koa, { DefaultState, DefaultContext } from 'koa';
import { readdirSync } from 'fs';
// 加载路由
export function loadRouters(app: Koa<DefaultState, DefaultContext>) {
  readdirSync(__dirname).forEach((dir) => {
    if (dir === 'index.ts') {
      return;
    }
    const route = require(`./${dir}/index.ts`).default;
    app.use(route.routes()).use(route.allowedMethods());
  });
}
