# 金繕文庫 Kintsugi Bunko 官網

Astro 純靜態網站，push 到 `main` 後由 Netlify 自動部署。

## 在本機預覽

```bash
npm install
npm run dev
```

打開 http://localhost:4321 。要看正式輸出的結果，用 `npm run build` 之後再 `npm run preview`。

## 新增一本書

1. 把封面圖放進 `src/assets/covers/`，例如 `newbook.jpg`（比例約 631 × 891）。
2. 複製 `src/content/books/lowvalley.md`，改名為網址要用的名稱，例如 `newbook.md`，網址就會是 `/books/newbook/`。
3. 修改 frontmatter：`no` 填下一個編號（例如 `"003"`），`cover` 改成 `../../assets/covers/newbook.jpg`，其他欄位照著填，沒有的欄位直接刪掉。介紹文字寫在 `---` 下方的正文，一段一行，段落之間空一行。

書目、「共 N 冊」、虛線空位的編號、其他書頁的「也在書架上」都會自動更新。

## 更換首頁主視覺的書

把新書的 `featured` 改成 `true`，舊書改成 `false`，並在新書補上 `feature` 欄位（`blurb` 介紹段落、`meta` 規格小字、`note` 可省略）。

## 常改的設定

`src/site.config.ts`：網站名稱、英文名、聯絡信箱、關於文字、電子報文案、頁尾社群連結、備用網域。

顏色與字體在 `src/styles/tokens.css`。

## 電子報

表單使用 Netlify Forms，第一次部署後在 Netlify 後台的 Forms 頁面可以看到 `newsletter` 表單與收到的信箱。

## SEO

全部自動產生，新增書籍時只要把 frontmatter 的 `description`（搜尋結果下方那段說明，建議 60 至 100 字）和 `book_format`（`Hardcover` 精裝或 `Paperback` 平裝）填好。

- 每頁都有 title、description、canonical 網址、Open Graph 與 Twitter 分享卡片。
- 單書頁的分享預覽圖由 `src/pages/og/[slug].jpg.ts` 在建置時用封面自動合成（1200 × 630）。
- 結構化資料（JSON-LD）在 `src/lib/seo.ts`：首頁是出版社與書目，單書頁是書籍（含 ISBN、定價、作者）與麵包屑。
- `sitemap-index.xml` 與 `robots.txt` 自動產生，感謝頁與 404 不列入、也不給搜尋引擎索引。

### 上線後要做一次的事

1. 到 Google Search Console 新增資源，選「網址前置字元」，填網站網址。
2. 驗證方式選「HTML 標記」，把 `content="..."` 裡的那串字貼到 `src/site.config.ts` 的 `googleSiteVerification`，部署後按驗證。
3. 驗證成功後，在「Sitemap」頁面提交 `sitemap-index.xml`。

換成正式網域時，記得重新提交一次。
