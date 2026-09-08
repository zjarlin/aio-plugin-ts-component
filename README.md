# AIO TypeScript Component 插件

这是使用 TypeScript、JCO 和 ComponentizeJS 构建的 AIO 全栈插件。它贡献一个计数器页面和账户区入口，并通过相同 Wasm Component 的 `handle` 导出提供受限后端请求处理。计数器使用 `actions` 页面体，按钮事件由宿主携带可信租户上下文和当前 `body.state` 交给 Component；Component 以无状态 reducer 形式返回下一页面体，状态由宿主按租户和 revision 持久化。

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
wasm-tools validate dist/plugin.wasm
wasm-tools component wit dist/plugin.wasm
```

依赖安装禁用 lifecycle scripts。插件安装阶段只读取仓库内已提交的 Component artifact，不运行 pnpm 或任意构建脚本。

ComponentizeJS 目前仍是实验性工具，SpiderMonkey 预初始化快照不保证字节级可重复。发布时必须提交 `dist/plugin.wasm`，AIO 安装器通过完整 Git 提交 SHA 锁定源码、锁文件和实际运行产物。

`handle` 的 `PluginRequest` 与 `ComponentResponse` 结构以 AIO 的 `docs/plugin/schema/` 为准，可通过 `aio plugin schema schemas` 获取，不从宿主私有实现反推字段。
