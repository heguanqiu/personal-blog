# Personal Blog

一个可 Docker 部署的个人博客，包含：

- GitHub 趋势榜抓取与基础分析
- 富文本文章发布
- 匿名评论
- 成果案例展示
- 单管理员后台

## 已实现能力

- `首页`
  - 个人简介
  - 最新趋势摘要
  - 最新文章
  - 精选案例
  - 最新评论
- `文章系统`
  - 富文本编辑
  - 草稿 / 发布
  - 分类 / 标签
- `案例系统`
  - 富文本编辑
  - 技术栈 / 截图 / 外链
  - 精选标记
- `趋势系统`
  - GitHub Trending 抓取
  - 趋势快照入库
  - 语言分布 / Star 增量分析
  - AI 摘要结构
  - 抓取失败时 graceful fallback
- `评论系统`
  - 匿名直接发布
  - 限流 / honeypot / 敏感词
  - 后台隐藏评论
- `后台`
  - 登录
  - 文章管理
  - 案例管理
  - 趋势任务与摘要修订
  - 评论管理
  - 站点设置
- `SEO`
  - `robots.txt`
  - `sitemap.xml`
  - `rss.xml`

## 技术栈

- Next.js 16 App Router
- React 19
- Prisma 6
- PostgreSQL
- Redis
- Tiptap
- Recharts
- Docker Compose

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 启动数据库和 Redis

```bash
docker compose up -d db redis
```

3. 初始化数据库

```bash
npm run db:push
```

4. 启动开发服务器

```bash
npm run dev
```

5. 可选：手动抓一次趋势

```bash
npm run worker:once
```

## Docker 运行

```bash
docker compose up --build
```

默认暴露端口：

- Web: `http://localhost:3000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## 环境变量

参考 `.env.example`。

本地默认 `.env` 已配置为：

- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/personal_blog?schema=public`
- `REDIS_URL=redis://localhost:6379`
- `APP_URL=http://localhost:3000`

Docker 内部连接地址由 `docker-compose.yml` 自动覆盖为 `db` 和 `redis` 服务名。

## 后台登录

默认凭据来自 `.env`：

- 用户名：`ADMIN_USERNAME`
- 密码：`ADMIN_PASSWORD`

当前默认值：

- `admin`
- `change-me`

第一次使用前建议改掉。

## 测试与构建

```bash
npm run lint
npm test
npm run build
```

## 当前限制

- AI 摘要需要配置 `OPENAI_API_KEY`
- 媒体上传底层已准备，本轮后台表单仍以 URL 输入为主
- 趋势抓取来自 GitHub 页面解析，页面结构变化时需要跟进调整
