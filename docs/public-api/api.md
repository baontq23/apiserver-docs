---
sidebar_position: 2
---

# Public API Overview

AuthTool cung cấp Public API cho phép bạn tích hợp và quản lý key một cách tự động. API sử dụng REST architecture với JSON format.

## Base URL

```
https://api.authtool.app
```

## Authentication

Tất cả API đều yêu cầu API Key trong header:

```
X-API-Key: YOUR_API_KEY
```

Bạn có thể lấy API Key từ [trang cài đặt tài khoản](https://authtool.app/account-settings/account).

## Available Endpoints

Hiện tại chúng tôi hỗ trợ 4 API endpoints chính:

### 1. [Tạo key kích hoạt một lần](./single-activate-key)

- **Endpoint**: `POST /public/v1/key/single-activate`
- **Mô tả**: Tạo key chỉ có thể kích hoạt 1 lần duy nhất

### 2. [Tạo key kích hoạt nhiều lần](./multiple-activate-key)

- **Endpoint**: `POST /public/v1/key/multiple-activate`
- **Mô tả**: Tạo key có thể kích hoạt nhiều lần với số lần tùy chỉnh

### 3. [Reset key](./reset-key)

- **Endpoint**: `PATCH /public/v1/key/{key}/reset`
- **Mô tả**: Reset key về trạng thái ban đầu, xóa tất cả kích hoạt

### 4. [Chi tiết key](./key-detail)

- **Endpoint**: `GET /public/v1/key/{key}/detail`
- **Mô tả**: Lấy thông tin chi tiết key và danh sách thiết bị đã kích hoạt

## Error Handling

API sử dụng HTTP status code tiêu chuẩn:

- **200**: Thành công
- **201**: Tạo thành công
- **400**: Bad Request - Lỗi tham số
- **401**: Unauthorized - API Key không hợp lệ
- **403**: Forbidden - Không có quyền truy cập
- **404**: Not Found - Không tìm thấy tài nguyên
- **422**: Unprocessable Entity - Lỗi validation
- **429**: Too Many Requests - Vượt quá rate limit
- **500**: Internal Server Error - Lỗi server

## Content Type

Tất cả request và response đều sử dụng `application/json`.

## Support

Nếu bạn gặp vấn đề với API, vui lòng liên hệ:

- Email: support@authtool.app
- Telegram: [APIServer Community](https://t.me/apiserver)
- Telegram: [Admin](https://t.me/baontq)
