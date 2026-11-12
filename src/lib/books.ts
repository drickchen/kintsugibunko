import { getCollection, type CollectionEntry } from 'astro:content';

export type Book = CollectionEntry<'books'>;

/** 依編號由新到舊 */
export async function getBooks(): Promise<Book[]> {
  const books = await getCollection('books');
  return books.sort((a, b) => Number(b.data.no) - Number(a.data.no));
}

/** 首頁主視覺：featured: true 的書；有多本時取編號最新的，都沒有就取最新一本 */
export function getFeatured(books: Book[]): Book {
  return books.find((b) => b.data.featured) ?? books[0];
}

export function nextNo(books: Book[]): string {
  const max = Math.max(0, ...books.map((b) => Number(b.data.no)));
  return String(max + 1).padStart(3, '0');
}

export const bookUrl = (book: Book) => `/books/${book.id}/`;

/** 「2026-10」→「2026 年 10 月」，「2024」→「2024」 */
export function dateLabel(published: string, { yearSuffix = false } = {}): string {
  const [y, m] = published.split('-');
  if (m) return `${y} 年 ${Number(m)} 月`;
  return yearSuffix ? `${y} 年` : y;
}

export const year = (published: string) => published.split('-')[0];

/** 「消化餅 編」或「消化餅 著」 */
export function byline(book: Book): string {
  const { editor, author } = book.data;
  if (editor) return `${editor} 編`;
  if (author) return `${author} 著`;
  return '';
}

export type SpecRow = { label: string; value: string; href?: string };

export function specRows(book: Book): SpecRow[] {
  const d = book.data;
  const rows: (SpecRow | false | undefined)[] = [
    d.author && { label: '作者', value: d.author },
    d.editor && { label: '編者', value: d.editor },
    {
      label: '出版',
      value: `${d.publisher}，${dateLabel(d.published, { yearSuffix: true })}${d.edition ?? ''}`,
    },
    { label: '類別', value: d.category },
    d.binding && { label: '裝幀', value: d.binding },
    d.size && { label: '尺寸', value: d.size },
    d.pages && { label: '頁數', value: `${d.pages} 頁` },
    d.entries && { label: '收錄', value: d.entries },
    d.cover_design && { label: '封面設計', value: d.cover_design, href: d.cover_design_url },
    {
      label: '定價',
      value: d.ebook_price
        ? `紙本 新台幣 ${d.price} 元．電子書 ${d.ebook_price} 元`
        : `新台幣 ${d.price} 元`,
    },
    d.isbn && { label: 'ISBN', value: d.isbn },
    d.eisbn && { label: 'EISBN', value: d.eisbn },
    d.social?.threads && {
      label: '官方帳號',
      value: `Threads @${d.social.threads.split('@').pop()}`,
      href: d.social.threads,
    },
  ];
  return rows.filter((r): r is SpecRow => Boolean(r));
}

const NUMERALS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

/** 1 →「一」，11 →「十一」，20 →「二十」 */
export function toChineseNumeral(n: number): string {
  if (n <= 10) return NUMERALS[n];
  if (n < 20) return `十${NUMERALS[n - 10]}`;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${NUMERALS[tens]}十${NUMERALS[ones]}`;
}
