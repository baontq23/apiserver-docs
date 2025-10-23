---
sidebar_position: 8
---

# Xóa key

API này cho phép bạn xóa một key cụ thể. Endpoint yêu cầu xác thực qua Public API Key và kiểm tra IP whitelist.

## Endpoint

```
DELETE https://api.authtool.app/public/v1/key/{key}
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Tham Số

### Path Parameters

| Tham số | Kiểu   | Bắt buộc | Mô tả                    |
| ------- | ------ | -------- | ------------------------ |
| `key`   | string | Có       | Giá trị key cần xóa      |

## Ví Dụ Request

### cURL

```bash
curl -X DELETE "https://api.authtool.app/public/v1/key/ABC123XYZ" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key"
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
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
  "message": "Key deleted successfully"
}
```

### Lỗi

#### Không Tìm Thấy Key (404)

```json
{
  "message": "Key not found"
}
```

#### Không Có Quyền (401)

```json
{
  "message": "Unauthorized"
}
```
