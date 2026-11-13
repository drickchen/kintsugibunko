/**
 * 每本書的分享預覽圖（1200 × 630）：米色底，封面置中，建置時自動產生。
 * 新增書籍不需要另外做圖。
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getBooks, type Book } from '../../lib/books';

const W = 1200;
const H = 630;
const COVER_H = 520;
const PANEL = { r: 242, g: 238, b: 229 }; // #F2EEE5

export const getStaticPaths = (async () => {
  const books = await getBooks();
  return books.map((book) => ({ params: { slug: book.id }, props: { book } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { book } = props as { book: Book };
  const coverPath = (book.data.cover as unknown as { fsPath?: string }).fsPath;
  if (!coverPath) throw new Error(`找不到 ${book.id} 的封面檔案路徑`);

  const cover = await sharp(coverPath).resize({ height: COVER_H }).jpeg().toBuffer();
  const { width: cw = 0 } = await sharp(cover).metadata();
  const left = Math.round((W - cw) / 2);
  const top = Math.round((H - COVER_H) / 2);

  // 封面下方一層柔和的陰影，和網站上的封面一致
  const shadow = await sharp({
    create: { width: W, height: H, channels: 4, background: { ...PANEL, alpha: 0 } },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${W}" height="${H}"><rect x="${left + 6}" y="${top + 18}" width="${cw - 12}" height="${COVER_H - 10}" fill="rgba(31,29,26,0.30)"/></svg>`,
        ),
      },
    ])
    .png()
    .toBuffer();
  const blurred = await sharp(shadow).blur(18).toBuffer();

  const png = await sharp({ create: { width: W, height: H, channels: 3, background: PANEL } })
    .composite([{ input: blurred }, { input: cover, left, top }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/jpeg' } });
};
