# 介紹react route



**HashRouter vs BrowserRouter 結論：差別在 URL 的格式和伺服器設定需求。**

---

| | HashRouter | BrowserRouter |
|---|---|---|
| URL 格式 | `example.com/#/home` | `example.com/home` |
| 伺服器設定 | 不需要 | 需要 |
| `#` 後面的部分 | 瀏覽器處理，不送到伺服器 | 完整路徑送到伺服器 |

---

**為什麼 HashRouter 不需要伺服器設定**

`#` 之後的東西瀏覽器不會送給伺服器，所以不管你在哪個路由重新整理，伺服器收到的都是 `example.com/`，永遠回傳 `index.html`，React 自己處理後面的路由。

---

**為什麼 BrowserRouter 需要伺服器設定**

你在 `example.com/home` 重新整理，瀏覽器真的會去問伺服器有沒有 `/home` 這個頁面。伺服器如果沒設定好，就會回 404。

設定方式是讓伺服器把所有路徑都導回 `index.html`，讓 React 接手。

---

**現在用哪個**

`BrowserRouter` 是主流，URL 比較乾淨。`HashRouter` 通常只用在靜態部署（GitHub Pages 這類沒辦法設定伺服器的場景）。