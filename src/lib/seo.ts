/**
 * 結構化資料（JSON-LD），讓搜尋引擎看懂「這是一家出版社」「這是一本書」。
 * 全部由 site.config 與書籍資料自動產生。
 */
import { SITE } from '../site.config';
import { bookUrl, type Book } from './books';

const abs = (path: string, site: URL) => new URL(path, site).href;

export const orgId = (site: URL) => abs('/#organization', site);
const personId = (name: string, site: URL) => abs(`/#person-${encodeURIComponent(name)}`, site);

export function organizationLd(site: URL) {
  return {
    '@type': 'Organization',
    '@id': orgId(site),
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: abs('/', site),
    logo: { '@type': 'ImageObject', url: abs(SITE.logo, site), width: 512, height: 512 },
    email: `mailto:${SITE.email}`,
    description: SITE.about,
    foundingLocation: { '@type': 'Place', name: '台北' },
    sameAs: SITE.social.map((s) => s.href),
  };
}

export function websiteLd(site: URL) {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', site),
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: abs('/', site),
    inLanguage: 'zh-Hant-TW',
    publisher: { '@id': orgId(site) },
  };
}

export function bookLd(book: Book, site: URL, coverUrl: string) {
  const d = book.data;
  const url = abs(bookUrl(book), site);
  const creatorName = d.author ?? d.editor;
  const creator = creatorName ? { '@type': 'Person', '@id': personId(creatorName, site), name: creatorName } : undefined;

  const firstLink = d.buy.links[0]?.href;
  const print = {
    '@type': 'Book',
    '@id': `${url}#print`,
    isbn: d.isbn,
    bookFormat: d.book_format ? `https://schema.org/${d.book_format}` : undefined,
    numberOfPages: d.pages,
    bookEdition: d.edition,
    offers: {
      '@type': 'Offer',
      price: d.price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      url: firstLink ?? url,
    },
  };
  const ebookLinks = d.buy.ebooks ? Object.values(d.buy.ebooks) : [];
  const ebook =
    d.eisbn || d.ebook_price
      ? {
          '@type': 'Book',
          '@id': `${url}#ebook`,
          isbn: d.eisbn,
          bookFormat: 'https://schema.org/EBook',
          offers: d.ebook_price
            ? {
                '@type': 'Offer',
                price: d.ebook_price,
                priceCurrency: 'TWD',
                availability: 'https://schema.org/InStock',
                url: ebookLinks[0] ?? url,
              }
            : undefined,
        }
      : undefined;

  return {
    '@type': 'Book',
    '@id': `${url}#book`,
    name: d.title,
    url,
    image: coverUrl,
    description: d.description ?? d.hook,
    genre: d.category,
    inLanguage: 'zh-Hant-TW',
    datePublished: d.published, // ISO 8601：「2026-10」或「2024」
    ...(d.author ? { author: creator } : {}),
    ...(d.editor ? { editor: creator } : {}),
    publisher: { '@id': orgId(site) },
    ...(d.cover_design ? { contributor: { '@type': 'Person', name: d.cover_design, url: d.cover_design_url } } : {}),
    ...(d.social?.threads ? { sameAs: [d.social.threads] } : {}),
    workExample: [print, ebook].filter(Boolean),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], site: URL) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path, site),
    })),
  };
}

export function itemListLd(books: Book[], site: URL) {
  return {
    '@type': 'ItemList',
    name: '書目',
    itemListElement: books.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(bookUrl(b), site),
      name: b.data.title,
    })),
  };
}

/** 包成一份 @graph，並去掉 undefined 欄位 */
export function graph(...nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }, (_k, v) =>
    v === undefined ? undefined : v,
  );
}
