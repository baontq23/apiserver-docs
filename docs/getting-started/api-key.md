---
sidebar_position: 1
---

# Lấy API Key

API Key là yêu cầu bắt buộc để sử dụng tất cả các endpoint của API. Trang này sẽ hướng dẫn bạn cách lấy và sử dụng API Key.

## Bước 1: Đăng ký tài khoản

Trước tiên, bạn cần có một tài khoản để có thể tạo API Key.

1. Truy cập vào trang [đăng ký](https://authtool.app/register)
2. Điền thông tin cần thiết
3. Xác thực email
4. Đăng nhập vào hệ thống

## Bước 2: Truy cập trang thông tin tài khoản

Sau khi đăng nhập thành công vào [authtool.app](https://authtool.app), bạn cần truy cập vào trang thông tin tài khoản để lấy API Key.

![Truy cập trang thông tin tài khoản](./img/step-2.png)

## Bước 3: Tìm và copy API Key

Trong trang thông tin tài khoản, bạn sẽ thấy API Key của mình:

![Tìm và copy API Key](./img/step-3.png)

:::warning Quan trọng

- API Key này là **duy nhất** và **bí mật** của bạn
- **Không chia sẻ** API Key với bất kỳ ai
  :::

:::note Lưu ý

- Thay thế `YOUR_API_KEY_HERE` bằng API Key thực tế của bạn
- Header `x-api-key` phải được thêm vào **mọi request** đến API
- Nếu không có header này hoặc API Key không hợp lệ, request sẽ trả về lỗi 401 Unauthorized
  :::
