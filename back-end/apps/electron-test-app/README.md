## Icon
```sh
convert favicon.png -resize 512x512 icon-512.png
magick favicon.png -resize 512x512 icon-512.png
png2icns favicon.icns icon-512.png
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
