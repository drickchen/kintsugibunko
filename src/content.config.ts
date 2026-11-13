import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** 目次項目：寫成字串會自動編號（一、二、三⋯⋯），也可以自己指定 label 與說明 */
const tocItem = z.union([
  z.string(),
  z.object({
    label: z.string().optional(),
    title: z.string(),
    desc: z.string().optional(),
  }),
]);

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      no: z.string(), // 三位數編號，例如 "003"
      title: z.string(),
      category: z.string(),
      author: z.string().optional(), // 著
      editor: z.string().optional(), // 編
      publisher: z.string().default('金繕文庫'),
      published: z.union([z.string(), z.number()]).transform(String), // "2026-10" 或 "2024"
      edition: z.string().optional(), // 例如「初版」，接在出版日期後面
      featured: z.boolean().default(false),

      hook: z.string(), // 一句話推薦
      shelf_line: z.string(), // 書目卡片上的一句話
      description: z.string().optional(), // 搜尋引擎與分享用的描述，沒填就用 hook

      cover: image(),
      cover_alt: z.string(),

      binding: z.string().optional(),
      /** 給搜尋引擎的裝幀類型：Hardcover 精裝、Paperback 平裝 */
      book_format: z.enum(['Hardcover', 'Paperback']).optional(),
      size: z.string().optional(),
      pages: z.number().optional(),
      entries: z.string().optional(),
      cover_design: z.string().optional(),
      cover_design_url: z.string().url().optional(),
      price: z.number(),
      ebook_price: z.number().optional(),
      isbn: z.string().optional(),
      eisbn: z.string().optional(),
      social: z
        .object({ threads: z.string().url().optional() })
        .optional(),

      /** 首頁主視覺用的文字，只有 featured 的書需要 */
      feature: z
        .object({
          blurb: z.string(),
          meta: z.string(),
          note: z.string().optional(),
        })
        .optional(),

      /** 目次：附錄、圖版、分輯等 */
      toc: z
        .array(z.object({ heading: z.string(), items: z.array(tocItem) }))
        .default([]),
      /** 目次放在「哪裡買」之前（before-buy）或書籍資料之後（after-specs） */
      toc_placement: z.enum(['before-buy', 'after-specs']).default('after-specs'),

      buy: z.object({
        note: z.string().optional(),
        links: z
          .array(
            z.object({
              label: z.string(),
              href: z.string().url(),
              style: z.enum(['primary', 'secondary']).default('primary'),
            }),
          )
          .default([]),
        ebooks: z.record(z.string(), z.string().url()).optional(),
        crowdfunding: z
          .object({ note: z.string(), href: z.string().url(), label: z.string() })
          .optional(),
      }),
    }),
});

export const collections = { books };
