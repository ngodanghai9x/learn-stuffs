|                  | Có UI? |        Chạy ở đâu?       | Thao tác DOM? | Dùng API chrome.\*? |
| ---------------: | :----: | :----------------------: | :-----------: | :-----------------: |
| content_scripts  |    ❌   |  trong tab user đang mở  |       ✅       |       hạn chế       |
|       background |    ❌   |        riêng, ngầm       |       ❌       |          ✅          |
|            popup |    ✅   | riêng, khi user mở popup |       ❌       |          ✅          |
