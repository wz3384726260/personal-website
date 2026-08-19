# AI TRAINER · PERSONAL ARCHIVE

面向 AI 训练师的个人作品集网站。以黑、石墨灰、银白与克制冷蓝为视觉基调，通过影像、作品档案和工作流方法，呈现模型训练与 AI 实践过程。

## 内容结构

1. 电影感首屏：使用深空几何影像，展示训练、对齐、演进的核心主张。
2. 实践索引：展示 AI 视觉实验轮播。
3. 关于：说明 AI 训练的方法和三步工作流。
4. 工具伙伴：以 Claude、Codex、DeepSeek、Cursor 为主体的空间轮播。
5. 项目档案：收录三段 AI 动态视觉实验视频。
6. 联系方式：保留后续补充的合作入口。

## 已实现交互

- 桌面端浮动胶囊导航：根据页面滚动位置平滑切换当前章节。
- 首屏主按钮眼球跟随：在精细指针设备上跟随鼠标，触摸设备与减少动态效果模式下保持居中。
- 各章节采用不同的进入与浏览动效，并完整支持 `prefers-reduced-motion`。
- 浏览器滚动条视觉隐藏，但鼠标滚轮、键盘和锚点跳转可正常使用。

## 本地运行

```bash
npm install
npm run dev
```

默认访问地址：`http://localhost:4174/`

## 校验与构建

```bash
npm run build
npm run test:sites
```

构建完成后，适用于 Sites 的产物位于 `dist/`：

- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

## 资产位置

- 首屏视频：`public/media/deep-space-geometry.mp4`
- 视觉实验素材：`public/media/showcase/`
- 工具伙伴形象：`public/media/partners/`
- 项目视频和封面：`public/media/projects/`

## 后续待补充

项目正式名称、项目背景与方法、个人姓名、联系方式及可公开的成果数据仍为待补充信息。网站当前采用清晰的替换占位文案，不虚构个人经历或指标。
