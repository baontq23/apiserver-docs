---
sidebar_position: 2
---

# Client API cho Mobile App Integration

## Base URL

```
POST https://api.authtool.app/public/v1/client/
```

## Flow tích hợp

### 1. Kiểm tra Package (Tùy chọn)

### 2. Kiểm tra Device (Bắt buộc)

### 3. Login với Key (Khi cần thiết)

## API Reference

### 1. Check Package

**Endpoint:** `POST /package`

**Mô tả:** Kiểm tra thông tin package, version, trạng thái hoạt động

**Request Body:**

```json
{
  "token": "your_package_token_here"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Dữ liệu sau khi decrypt:**

```json
{
  "status": 1, // 1: Running, 0: Maintenance
  "name": "Package Name",
  "version": "1.0.0",
  "updateNote": "Update notes",
  "downloadUpdateLink": "https://...",
  "contactUrl": "https://...",
  "isNeedKey": true, // Có cần authentication không
  "requestTime": 1234567890
}
```

**Error Responses:**

- `400` - Package token invalid
- `403` - Package stopped by admin
- `404` - Package not found

### 2. Check Device (Bắt buộc)

**Endpoint:** `POST /check`

**Mô tả:** Kiểm tra thiết bị có license đã tồn tại hay chưa. API này phải được gọi đầu tiên khi user mở app.

**Request Body:**

```json
{
  "token": "your_package_token_here",
  "data": "encrypted_device_info"
}
```

**Dữ liệu trước khi encrypt:**

```json
{
  "uid": "unique_device_id", // UDID hoặc unique identifier
  "clientOS": "iOS 17.0",
  "clientModel": "iPhone 15 Pro",
  "clientOSVersion": "17.0.1"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Dữ liệu sau khi decrypt:**

```json
{
  "status": 1, // 1: Active, 0: Inactive
  "expiredAt": "2024-12-31T23:59:59.000Z",
  "key": "user_key_value",
  "requestTime": 1234567890,
  "isExpired": false
}
```

**Error Responses:**

- `400` - UID is required
- `404` - Device not found (cần gọi API login)

### 3. Login với Key

**Endpoint:** `POST /login`

**Mô tả:** Đăng nhập bằng key để kích hoạt license cho thiết bị

**Request Body:**

```json
{
  "token": "your_package_token_here",
  "data": "encrypted_login_data"
}
```

**Dữ liệu trước khi encrypt:**

```json
{
  "uid": "unique_device_id",
  "key": "user_input_key",
  "clientOS": "iOS 17.0",
  "clientModel": "iPhone 15 Pro",
  "clientOSVersion": "17.0.1"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Dữ liệu sau khi decrypt:**

```json
{
  "status": 1, // 1: Success
  "expiredAt": "2024-12-31T23:59:59.000Z",
  "key": "activated_key_value",
  "requestTime": 1234567890,
  "message": "Login successful"
}
```

**Error Responses:**

- `400` - Key is required / Key disabled
- `404` - Key not found
- `409` - Key đã đạt giới hạn thiết bị

## Security Notes

1. **Package Token**: Lưu trữ an toàn, không expose trong code
2. **AES Key**: Nhận từ server khi setup package
3. **Device UID**: Sử dụng identifier duy nhất để tối ưu tránh phải reset lại key
4. **Data Encryption**: Tất cả dữ liệu phải được mã hóa
