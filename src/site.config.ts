// ============================================================
// 站点总配置：你 90% 的个性化修改都在这个文件里
// 改完保存，网站刷新即可看到效果
// ============================================================

export const site = {
  /** 站点名，显示在左上角和首页大标题 */
  name: 'colin 的知识库',

  /** 一句话介绍，显示在首页 */
  description: '暖通空调 / 数据中心温控 / 工程方案设计 —— 把工作中的判断沉淀下来。',

  /** 你的名字 */
  author: 'colin',

  /** 域名：部署拿到网址后改成真实网址 */
  url: 'https://colinttyy.github.io',

  /** 语言 */
  lang: 'zh-CN',

  /** 首页顶部的社交/联系链接；不需要的整行删掉 */
  links: [
    { label: 'GitHub', url: 'https://github.com/colinttyy' },
  ],

  /** 栏目配置：顺序、路径、显示名称、首页简介 */
  categories: [
    {
      key: 'notes' as const,
      path: '/notes',
      label: '专业笔记',
      icon: '▤',
      blurb: '暖通、数据中心、液冷、工程计算 —— 解决过的问题与判断依据。',
    },
    {
      key: 'projects' as const,
      path: '/projects',
      label: '项目作品',
      icon: '◈',
      blurb: '做过的项目：背景、我负责的部分、结果与复盘。',
    },
    {
      key: 'books' as const,
      path: '/books',
      label: '读书笔记',
      icon: '❏',
      blurb: '读过的书，摘录与自己的批注。',
    },
    {
      key: 'resources' as const,
      path: '/resources',
      label: '资源收藏',
      icon: '✧',
      blurb: '好用的工具、模板、链接，按主题归类。',
    },
  ],
};

/** 首页"最近更新"显示几条 */
export const RECENT_COUNT = 6;

/** 是否在每页顶部显示"示例内容"提示条（内容换成你自己的之后设为 false） */
export const SHOW_DEMO_BANNER = false;
