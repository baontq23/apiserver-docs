---
sidebar_position: 9
---

# Cập nhật hạn sử dụng key

API này cho phép thay đổi ngày hết hạn của một key. Có thể tuỳ chọn đồng bộ ngày hết hạn mới cho tất cả thiết bị đã kích hoạt key đó.

## Endpoint

```
PATCH https://api.authtool.app/public/v1/key/{key}
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Tham Số

### Path Parameters

| Tham số | Kiểu   | Bắt buộc | Mô tả                   |
| ------- | ------ | -------- | ----------------------- |
| `key`   | string | Có       | Giá trị key cần cập nhật |

### Request Body

| Trường        | Kiểu    | Bắt buộc | Mô tả                                                                                                  |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `expiredAt`   | string  | Có       | Ngày hết hạn mới của key (ISO 8601, ví dụ `2025-12-31T23:59:59.000Z`)                                  |
| `syncDevices` | boolean | Không    | `true` để cập nhật luôn ngày hết hạn của tất cả thiết bị đã kích hoạt key thành `expiredAt`. Mặc định `false` |

## Ví Dụ Request

### cURL

```bash
curl -X PATCH "https://api.authtool.app/public/v1/key/ABC123XYZ" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "expiredAt": "2025-12-31T23:59:59.000Z",
    "syncDevices": true
  }'
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ";
$data = [
    "expiredAt" => "2025-12-31T23:59:59.000Z",
    "syncDevices" => true
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-API-Key: your-api-key"
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
print_r($result);
?>
```

## Response

### Thành Công (200)

```json
{
  "message": "Update successfully"
}
```

### Lỗi

#### Không Tìm Thấy Key (404)

```json
{
  "message": "Key not found"
}
```

#### Lỗi Validation (400)

Thiếu `expiredAt`, `expiredAt` không phải ngày hợp lệ, hoặc `syncDevices` không phải boolean:

```json
{
  "code": 400,
  "message": "\"expiredAt\" is required"
}
```

#### Không Có Quyền (401)

```json
{
  "message": "Unauthorized"
}
```

## Ghi chú

- Chỉ cập nhật được key thuộc về tài khoản của bạn
- Khi không truyền `syncDevices` (hoặc `false`), chỉ ngày hết hạn của key thay đổi; các thiết bị đã kích hoạt giữ nguyên hạn cũ
- Khi `syncDevices` là `true`, mọi thiết bị đã kích hoạt key sẽ có ngày hết hạn bằng `expiredAt`, kể cả thiết bị đã hết hạn trước đó
- Có thể kiểm tra kết quả bằng API [Chi tiết key](./key-detail)
