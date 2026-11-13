# 金繕文庫官網｜建站說明

這個資料夾是金繕文庫官方網站的專案。請依照本文件與 `design/` 裡的設計稿，建立一個靜態網站，部署到 Netlify。

## 已確定的決策（2026-11，覆蓋下方舊規格）

- Logo：改用消化餅提供的九塊裂紋圓形圖形（`src/assets/brand/mark.svg`）加標準字（`src/assets/brand/word.svg`），顏色 #1F1D1A，不加金色。下方「Logo」一節的方框斜線 SVG 已停用，favicon 也改用新圖形。
- 英文名：Kintsugi Bunko，出現在 header、頁尾、首頁 title 與分享卡片。
- 頁尾不放標語，「破了，就描金。」已拿掉，改放「金繕文庫 Kintsugi Bunko」。
- 《死語復興辭典》定價：新台幣 899 元（全站統一）。
- 聯絡信箱：chocodigesta@gmail.com，設定在 `src/site.config.ts`。
- 網域：尚未決定。部署時自動使用 Netlify 提供的 `URL` 環境變數，備用值在 `src/site.config.ts`。
- 封面圖放在 `src/assets/covers/`（不是 `public/covers/`），Astro 才能輸出 WebP 與多種尺寸。
- 首頁「關於」改用消化餅提供的新文字（見 `src/site.config.ts` 的 `about`），同時作為首頁的搜尋說明；首頁 title 只用「金繕文庫 Kintsugi Bunko」。
- 所有書頁的「書籍資料」都由資料自動產生，順序固定，包含「類別」一列。

## 品牌是什麼

金繕文庫是消化餅在台北經營的一人出版社。世界破破爛爛，文學把它縫縫補補，但本社不出心理勵志書，而是把人性的不完美赤裸地呈現出來，帶點幽默。網站要安靜、優雅、好讀，品牌個性主要靠每本書的一句話推薦來傳達，不寫長篇理念宣言。

## 設計稿（以此為準）

- `design/index.html`：首頁（fluid，桌機與手機皆可，直接用瀏覽器打開看）
- `design/book-y2kdict.html`：《死語復興辭典》單書頁（手機版樣稿）
- `design/book-lowvalley.html`：《人生低谷觀光指南》單書頁（手機版樣稿）
- `design/404.html`：404 頁（手機版樣稿）
- `design/screenshots/`：以上頁面的截圖，桌機首頁與各頁手機版

所有文案、排版、間距、配色都以設計稿為準，文案逐字沿用，不要自行改寫或增加宣傳語。單書頁與 404 只有手機版樣稿，桌機版請自行延伸：單書頁建議左欄封面、右欄文字的兩欄排版，內容寬度上限與首頁一致（1120px），手機寬度時回到樣稿的單欄。

`design/` 只是參考稿，不要部署出去，也不要直接複製它的 inline style，請整理成元件與共用樣式。

## 技術規格

- 框架：Astro（純靜態輸出），樣式用一般 CSS 與 CSS 變數，不使用 Tailwind 或 UI 套件。
- 書籍資料用 Astro content collections：每本書一個 Markdown 檔，放在 `src/content/books/`，書目頁與單書頁都由資料自動產生。之後新增第三本書，應該只需要新增一個 Markdown 檔和一張封面圖。
- 封面圖：`public/covers/`（`y2kdict.jpg`、`lowvalley.jpg`），請用 Astro 的圖片處理輸出適當尺寸與 WebP。
- 字體：Google Fonts 的 Noto Serif TC（400、500、600）與 Noto Sans TC（400、500），使用 `display=swap`。
- 部署：GitHub 儲存庫連到 Netlify，push 到 main 自動部署。建立 `netlify.toml`（build 指令與輸出資料夾）。
- 電子報表單：使用 Netlify Forms（`data-netlify="true"`，含 honeypot 欄位），不接其他第三方服務。
- 語言：`<html lang="zh-Hant-TW">`。所有中文文案使用台灣繁體中文與全形標點。

## 網址結構

- `/` 首頁：新書主視覺（目前是《死語復興辭典》）、書目、關於、電子報、頁尾
- `/books/y2kdict/` 《死語復興辭典》
- `/books/lowvalley/` 《人生低谷觀光指南》
- 404 頁

首頁主視覺顯示哪本書，請用書籍資料裡的 `featured: true` 控制。書目依編號由新到舊排列，最後保留一格虛線的「下一本，還在裂開中。」空位，編號自動為下一號。

## 設計規範

顏色（請設成 CSS 變數）：

| 用途 | 色碼 |
| --- | --- |
| 頁面底色 | #FAF8F3 |
| 區塊底色（主視覺、電子報、書頁封面區） | #F2EEE5 |
| 主要文字、深色按鈕 | #1F1D1A |
| 內文 | #4F4A42 |
| 次要文字 | #6B655B |
| 分隔細線 | #E3DED4 |
| 金色細線、箭頭、連結底線（裝飾用） | #B08D4A |
| 金色文字（編號、小標籤，僅用於淺色底） | #7E6128 |
| 書目空位虛線 | #CFC6B4 |

字體：標題與書名用 Noto Serif TC，字距約 0.08em 至 0.24em；內文與介面用 Noto Sans TC，內文 15 至 16px，行高約 1.9。

金色的使用規則，這是品牌最重要的細節：金色只出現在筆直的細線（標題下方短線、區塊上緣細線）、logo 的斜線、按鈕裡的「⇀」箭頭、連結底線，以及編號小字。請勿加入手繪感或不規則的線條、手寫字體、螢光筆效果、漸層、陰影過重的卡片或 emoji。

Logo（直接用這段 SVG，旁邊接 Noto Serif TC 600 的「金繕文庫」，字距 0.2em）：

```html
<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect x="0.75" y="0.75" width="28.5" height="28.5" fill="none" stroke="#1F1D1A" stroke-width="1.5"/><path d="M0.75 19 L11 14.5 L17 17 L29.25 9" fill="none" stroke="#B08D4A" stroke-width="1.6"/></svg>
```

同一個圖形也請做成 favicon（SVG favicon 加一個 PNG 備援）。

## 無障礙與手機

- 手機優先，所有可點擊元素至少 44px 高。
- 封面圖都要有描述性的 alt 文字（設計稿裡已寫好）。
- 文字對比至少 4.5:1，上表的色碼已符合，不要再調淡。
- 每頁有 title、description，以及 Open Graph 標籤（單書頁用該書封面當 og:image）。產生 sitemap。

## 書籍資料

以下是兩本書目前確定的資料，請據此建立 content 檔案。設計稿中的介紹文字、附錄目次、購買連結都要放進對應欄位或正文。

```yaml
- slug: y2kdict
  no: "002"
  title: 死語復興辭典
  category: 辭典
  editor: 消化餅
  publisher: 金繕文庫
  published: 2026-10
  featured: true
  hook: 史上第一本最ㄅㄧㄤˋ又最 LKK 的死語寶典。
  shelf_line: 那些年你打過、現在打了會被當成長輩的字。
  binding: 精裝，皮革觸感書封燙金
  size: 13 × 19 公分（32 開）
  pages: 671
  entries: 250 餘條詞目，附錄十一篇，圖版二組
  price: 890
  isbn: 978-626-99195-2-9
  appendix:
    - Call 機數字傳情表
    - 批踢踢歷屆流行語大賞名單
    - 惡搞反轉簡寫詞彙表
    - 已成為時代眼淚之十事
    - 台灣流行文化大事年表
    - 網路世代朝代表
    - 火星文一覽表
    - 台語諧音與英語簡寫表
    - 台灣常見人名表
    - 常見順口溜一覽表
    - 死語搶救大作戰致謝名單
  plates:
    - 圖版一：Windows 桌面遺址群
    - 圖版二：九大科技遺物
  buy:
    note: 本書透過與友善書業供給合作社合作的獨立書店販售。
    bookstores: https://fribooker.wordpress.com/bookstore/
    crowdfunding: https://www.zeczec.com/projects/y2kdict
    crowdfunding_note: 本書曾於嘖嘖集資，241 位支持者，達成 288%。
  social:
    threads: https://www.threads.com/@y2k_dict

- slug: lowvalley
  no: "001"
  title: 人生低谷觀光指南
  category: 雜文集
  author: 消化餅
  publisher: 金繕文庫
  published: 2024
  hook: 沒資格灌你勵志毒雞湯，只有厭世厭自己和滿溢的理想主義之間的垂死掙扎。
  shelf_line: 教甄第七年落榜、集滿七個備取之後，寫給你的低谷導覽。
  binding: 文庫本（二刷販售中）
  cover_design: Yuga Huang
  cover_design_url: https://www.behance.net/YugaHuang
  price: 300
  ebook_price: 199
  isbn: 978-626-99195-0-5
  eisbn: 978-626-99195-1-2
  sections:
    - 輯一 作文練習中
    - 輯二 INFP 人生練習
    - 輯三 那些靈光一閃
  buy:
    print: https://myship.7-11.com.tw/general/detail/GM2411086699567
    bookstores: https://chocodigesta.wixsite.com/lowvalleyguide
    ebooks:
      博客來: https://www.books.com.tw/products/E050248533
      讀墨: https://readmoo.com/book/210360914000101
      Kobo: https://www.kobo.com/tw/zh/ebook/6NAfxXvqVT2xs0g2WlbkTg
      Pubu: https://www.pubu.com.tw/ebook/479801
```

頁尾社群連結：Threads（https://www.threads.com/@y2k_dict）、Podcast 青春愛消遣（https://www.instagram.com/youngloveplay/）。頁尾標語「破了，就描金。」

## 尚未確定（先留變數，不要自己編）

- 聯絡信箱（頁尾目前寫著 [聯絡信箱]）
- 網站網域

## 工作方式

- 開工前先讀完 `design/` 的四個頁面與截圖，再提出你的檔案結構規劃，等我確認後才開始寫。
- 開發時用 `npm run dev` 在本機預覽。改完直接 commit 並 push 到開發分支，不用每次詢問（消化餅於 2026-11-13 指示）。
- `main` 由消化餅手動合併，不要直接 push 到 `main`。Netlify 從 `main` 部署，每次部署都會消耗點數，修改請累積在開發分支。
- 完成後提供一份簡短說明：怎麼新增一本書、怎麼換首頁主視覺的書、怎麼在本機預覽。
