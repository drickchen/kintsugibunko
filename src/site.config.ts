/**
 * 網站共用設定。網域、信箱、社群連結都只在這裡改。
 */

// 網域還沒決定。部署到 Netlify 時會自動帶入 Netlify 提供的 URL 環境變數，
// 確定網域後把 FALLBACK_URL 改成正式網址即可。
const FALLBACK_URL = 'https://kintsugibunko.netlify.app';
export const SITE_URL = (process.env.URL || FALLBACK_URL).replace(/\/$/, '');

export const SITE = {
  name: '金繕文庫',
  nameEn: 'Kintsugi Bunko',
  email: 'chocodigesta@gmail.com',
  year: 2026,
  about:
    '金繕文庫是消化餅在台北經營的一人出版社，出版那些把人的破綻看得一清二楚、讀著讀著又忍不住笑出來的書。',
  newsletter: {
    title: '電子報',
    lead: '新書與活動消息，不常寄。',
  },
  social: [
    { label: 'Threads', href: 'https://www.threads.com/@y2k_dict' },
    { label: 'Podcast 青春愛消遣', href: 'https://www.instagram.com/youngloveplay/' },
  ],
} as const;
