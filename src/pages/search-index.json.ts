import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORY_META, type CategoryKey } from '../lib/utils';

/** 把 Markdown 正文压成纯文本，供前端搜索用 */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const keys: CategoryKey[] = ['notes', 'projects', 'books', 'resources'];
  const items = [];

  for (const key of keys) {
    const entries = await getCollection(key);
    for (const e of entries) {
      if (e.data.draft) continue;
      items.push({
        title: e.data.title,
        description: e.data.description,
        tags: e.data.tags,
        date: e.data.date.toISOString().slice(0, 10),
        category: CATEGORY_META[key].label,
        url: `${CATEGORY_META[key].path}/${e.id}/`,
        text: toPlainText(e.body ?? ''),
      });
    }
  }

  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  return new Response(JSON.stringify({ items }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
