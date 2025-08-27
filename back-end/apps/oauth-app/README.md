### Compare
|                     | FE exchange + backend verify                                                                        | Backend exchange (chuẩn code flow)                     |
| ------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Quy trình           | FE lấy access\_token rồi đưa backend                                                                | Backend lấy code rồi tự đổi thành access\_token        |
| Token lộ            | FE có access\_token (nằm ở client)                                                                  | Chỉ backend giữ access\_token                          |
| Bảo mật             | Rủi ro lớn hơn: access\_token nằm trên FE, dễ bị JS leak, XSS, inspect                              | An toàn hơn: FE chỉ cầm code + state; BE mới cầm token |
| Scope               | Khó dùng refresh token (FE không nên cầm refresh token)                                             | Backend dễ lưu refresh token, tự refresh               |
| Provider khuyến cáo | Không khuyến khích implicit flow; Facebook, Google đều khuyến cáo dùng code flow (PKCE hoặc thường) | Chuẩn khuyến cáo                                       |
| Kiểm soát           | Khó kiểm soát: token expiry, revoke, multi-login                                                    | Backend kiểm soát toàn bộ                              |
| State               | FE phải tự quản state & anti-CSRF                                                                   | Backend lưu & so sánh state dễ hơn                     |

#### 🎨 Flow chart 1 – FE cầm access_token (implicit / hybrid flow)
```md
[User]
   |
   v
[FE redirect user sang Facebook login URL (client_id, redirect_uri, state, response_type=token)]
   |
   v
[Facebook] ----> [User login & grant]
   |
   v
[Facebook redirect lại FE với access_token + state]
   |
   v
[FE]
   |
   v
[FE gửi access_token về Backend]
   |
   v
[Backend dùng access_token gọi Facebook API lấy profile]
   |
   v
[Backend tạo user session/JWT]
```

#### 🎨 Flow chart 2 – Authorization code flow (backend exchange)
```md
[User]
   |
   v
[FE redirect user sang Facebook login URL (client_id, redirect_uri, state, response_type=code)]
   |
   v
[Facebook] ----> [User login & grant]
   |
   v
[Facebook redirect lại FE (hoặc trực tiếp backend) kèm code + state]
   |
   v
[FE gửi code + state về Backend]
   |
   v
[Backend so sánh state]
   |
   v
[Backend gửi code + client_secret tới Facebook để exchange access_token]
   |
   v
[Facebook trả access_token (+ refresh_token)]
   |
   v
[Backend gọi Facebook API lấy profile]
   |
   v
[Backend tạo user session/JWT]
```

### Summary
#### 🚨 Điểm yếu lớn nhất của cách để FE cầm access_token:

- Access token nằm ở browser ⇒ dễ bị leak qua: XSS, Browser extension độc hại, Network log nếu không cẩn thận
- FE không nên cầm refresh token (quá nguy hiểm)
- Không thể "centralize" control: backend không tự refresh được, không log được revoke, không cắt session v.v.
- Khó comply chuẩn security (ISO, PCI-DSS)

#### ⚡ Tóm lại:
- Về lý thuyết: vẫn làm được (FE cầm access_token → BE verify), Nhưng:
- Kém an toàn hơn nhiều
- Khó maintain, khó mở rộng
- Không đúng best practice OAuth 2.0

#### Trong implicit flow (chuẩn OAuth 2.0):
- FE không cần client_secret.
- Lý do: client_secret tuyệt đối không để client cầm (vì sẽ bị leak).
- FE chỉ redirect user sang Facebook, nhận access_token trực tiếp (response_type=token).
- Nhưng implicit flow không bao giờ có refresh_token (theo RFC).
- Nếu dùng hybrid flow (FE gọi backend để lấy refresh_token): backend sẽ cần client_secret để exchange.