import { writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * 构建后自动生成 sitemap-index.xml + sitemap-0.xml。
 * 你不需要改这个文件，只在 astro.config.mjs / src/site.config.ts 里填对域名即可。
 */

const DIST = 'dist';
// 从 src/site.config.ts 里读 URL 太麻烦，这里直接读 astro.config.mjs 里写的 site
const { readFileSync } = await import('node:fs');
const astroConfig = readFileSync('astro.config.mjs', 'utf8');
const siteMatch = astroConfig.match(/site:\s*['"]([^'"]+)['"]/);
const SITE = (siteMatch?.[1] ?? 'https://example.vercel.app').replace(/\/$/, '');

/** 递归收集所有 index.html，转换成 URL 路径 */
function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      collect(full, out);
    } else if (name === 'index.html') {
      let rel = relative(DIST, dir).split(sep).join('/');
      if (rel === '') rel = '';
      out.push(rel === '' ? '/' : `/${rel}/`);
    }
  }
  return out;
}

const urls = collect(DIST)
  .filter((p) => !p.startsWith('/404'))
  .sort();

const body = urls
  .map((p) => `  <url><loc>${SITE}${p}</loc></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>
</sitemapindex>
`;

writeFileSync(join(DIST, 'sitemap-0.xml'), sitemap, 'utf8');
writeFileSync(join(DIST, 'sitemap-index.xml'), index, 'utf8');
console.log(`[sitemap] ${urls.length} 个页面 → sitemap-index.xml`);
