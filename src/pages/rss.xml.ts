import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { CATEGORY_META, type CategoryKey } from '../lib/utils';

export async function GET(context: { site: URL }) {
  const keys: CategoryKey[] = ['notes', 'projects', 'books', 'resources'];
  const items = [];

  for (const key of keys) {
    const entries = await getCollection(key);
    for (const e of entries) {
      if (e.data.draft) continue;
      items.push({
        title: e.data.title,
        description: e.data.description,
        pubDate: e.data.date,
        link: `${CATEGORY_META[key].path}/${e.id}/`,
        categories: [CATEGORY_META[key].label, ...e.data.tags],
      });
    }
  }

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items,
    customData: `<language>zh-CN</language>`,
  });
}
