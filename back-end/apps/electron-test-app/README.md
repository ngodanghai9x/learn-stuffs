## Icon
```sh
convert favicon.png -resize 512x512 icon-512.png
magick favicon.png -resize 512x512 icon-512.png
png2icns favicon.icns icon-512.png
```

## Structure
| File/Thư mục                                                   | Mô tả                                                                                                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`main.ts`**                                                  | Chạy ở **Main process**. Tạo cửa sổ (`BrowserWindow`), khởi động app, xử lý `ipcMain`, native API (`exec`, `fs`, `autoUpdater`,...)         |
| **`preload.ts`**                                               | Chạy **trước khi renderer được load**, là cầu nối an toàn giữa main và renderer. Dùng `contextBridge` để expose hàm ra `window.electronAPI` |
| **`renderer.ts`**                                              | Chạy ở **Renderer process**. Xử lý tương tác người dùng, DOM, WebRTC, v.v. Không được `require('electron')` trừ khi có preload              |
| **`public/index.html`**                                        | HTML của giao diện chính. Import `renderer.js` tại đây                                                                                      |
| **`dist/`**                                                    | Nơi chứa JS đã transpile từ TS (sau `tsc`)                                                                                                  |
| **`package.json`**                                             | Scripts, dependencies và cấu hình build (electron-builder)                                                                                  |
| **`electron-builder.yml`** (hoặc `build` trong `package.json`) | Cấu hình cho build đa nền tảng (AppImage, .exe, .dmg, etc.)                                                                                 |


## Diagrams
```
[Web Browser]              [Signaling Server]                [Agent (Electron)]
     |                           |                                   |
     |------> yêu cầu kết nối -->|                                   |
     |                           |----> gửi yêu cầu tới Agent ------>|
     |                           |<---- Agent xác nhận Allow -------|
     |<---------------- Thiết lập kết nối WebRTC ------------------>|
     |<========== Nhận video màn hình qua WebRTC ==================|
     |==== Gửi chuột/phím qua WebRTC DataChannel =================>|
     |                           |                         robotjs xử lý
```

## Windows
- ✅ Không cần xin quyền đặc biệt

- Nut.js hoạt động bình thường ngay.

- Có thể gửi phím, chuột, ảnh chụp màn hình... mà không bị giới hạn.

⚠ Nhưng một số phần mềm bảo mật / antivirus có thể ngăn app mô phỏng bàn phím. Nếu gặp lỗi, thử chạy app dưới quyền Admin.

## Linux (Ubuntu, Debian, etc.)
- ✅ Không cần quyền đặc biệt, nhưng cần tool phụ trợ

- Nut.js phụ thuộc vào các công cụ như:

    - xdotool (gõ phím, chuột)
    - libx11-dev (để build native bindings)
`sudo apt install xdotool libx11-dev`

🧠 Với Wayland (Ubuntu 22.04+), xdotool có thể không hoạt động → cần chuyển sang X11 (nếu cần).

## macOS
- ❗ BẮT BUỘC phải cấp quyền Accessibility (Trợ năng) thì mới gõ phím được

- Cụ thể:
    Chạy app HaindApp ít nhất 1 lần

    Vào:
    System Settings → Privacy & Security → Accessibility

    Bật quyền cho:

    Terminal (nếu chạy từ terminal)

    Hoặc app HaindApp bạn build (HaindApp, hoặc tên app của bạn)
