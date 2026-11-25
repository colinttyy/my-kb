import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 四个内容集合（categories）。想加第五个栏目，复制一段改名字即可。
 * 每个集合对应 src/content/<集合名>/ 目录下的 .md 文件。
 */
const base = {
  title: z.string(),
  description: z.string().default(''),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
};

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({ ...base }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    ...base,
    author: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    role: z.string().optional(),
    period: z.string().optional(),
    stack: z.array(z.string()).default([]),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({ ...base }),
});

export const collections = { notes, books, projects, resources };
