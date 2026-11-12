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
