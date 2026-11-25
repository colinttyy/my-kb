import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 部署到 GitHub Pages 用户站：https://colinttyy.github.io
  // 这个值会写进 RSS 和站点地图，必须是你的真实网址
  site: 'https://colinttyy.github.io',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
