---
sidebar_position: 7
---

# Thay đổi trạng thái key

API này cho phép bạn thay đổi trạng thái của một key cụ thể. Endpoint yêu cầu xác thực qua Public API Key và kiểm tra IP whitelist.

## Endpoint

```
PATCH https://api.authtool.app/public/v1/key/{key}/change-status
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Tham Số

### Path Parameters

| Tham số | Kiểu   | Bắt buộc | Mô tả                               |
| ------- | ------ | -------- | ----------------------------------- |
| `key`   | string | Có       | Giá trị key cần thay đổi trạng thái |

### Request Body

| Trường   | Kiểu   | Bắt buộc | Mô tả                                                         |
| -------- | ------ | -------- | ------------------------------------------------------------- |
| `status` | number | Có       | Giá trị trạng thái mới cho key (0: Vô hiệu hóa, 1: Kích hoạt) |

## Ví Dụ Request

### cURL

```bash
curl -X PATCH "https://api.authtool.app/public/v1/key/ABC123XYZ/change-status" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "status": 1
  }'
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ/change-status";
$data = [
    "status" => 1
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
  "message": "Key status changed successfully"
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

```json
{
  "message": "Validation error",
  "details": "status is required"
}
```

#### Không Có Quyền (401)

```json
{
  "message": "Unauthorized"
}
```
