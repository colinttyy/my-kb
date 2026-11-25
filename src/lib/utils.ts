export type CategoryKey = 'notes' | 'books' | 'projects' | 'resources';

/**
 * 集合名 → 路径 / 中文名 的映射。
 * 想加新栏目：先在 src/content.config.ts 加集合，再在这里加一行，最后在 site.config.ts 的 categories 里加一项。
 */
export const CATEGORY_META: Record<
  CategoryKey,
  { path: string; label: string; collection: CategoryKey }
> = {
  notes: { path: '/notes', label: '专业笔记', collection: 'notes' },
  books: { path: '/books', label: '读书笔记', collection: 'books' },
  projects: { path: '/projects', label: '项目作品', collection: 'projects' },
  resources: { path: '/resources', label: '资源收藏', collection: 'resources' },
};

/** 把 Date 格式化成 2024-06-01 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 把标签名转成安全的 URL 片段（中文标签也能用） */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag);
}
