import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ⚠️ 换成你的真实域名后，RSS 和站点地图里的链接才是对的
  site: 'https://example.vercel.app',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
