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
  /** 首頁「關於」的文字，同時也是搜尋結果與分享卡片上的說明 */
  about:
    '金繕文庫是一間台北的一人獨立出版社，為負責人消化餅把一些奇形怪狀的想法印成出版品的機構，以金繕為名，試圖用文字勾勒出萬事萬物中歪斜卻值得細細端詳的奇異之美。',
  /** 方形 logo（給搜尋引擎與結構化資料用） */
  logo: '/logo.png',
  /** Google Search Console 的 HTML 標記驗證碼，只填 content 裡的那串字；不用就留空 */
  googleSiteVerification: '',

  newsletter: {
    title: '電子報',
    lead: '新書與活動消息，不常寄。',
  },
  social: [
    { label: 'Threads', href: 'https://www.threads.com/@y2k_dict' },
    { label: 'Podcast 青春愛消遣', href: 'https://www.instagram.com/youngloveplay/' },
  ],
} as const;
