---
sidebar_position: 5
---

# Reset key

API này cho phép reset key về trạng thái ban đầu, xóa tất cả các lần kích hoạt đã sử dụng.

## Endpoint

```
PATCH https://api.authtool.app/public/v1/key/{key}/reset
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Path Parameters

| Tham số | Kiểu   | Bắt buộc | Mô tả            |
| ------- | ------ | -------- | ---------------- |
| `key`   | string | ✅       | Mã key cần reset |

## Ví dụ Request

```
PATCH https://api.authtool.app/public/v1/key/KEY1-XXXX-XXXX-XXXX/reset
```

## Request Body

Không cần request body cho API này.

## Response

### Thành công (200 OK)

```json
{
  "message": "Reset successfully",
  "resetCount": 3
}
```

### Lỗi (404 Not Found)

```json
{
  "message": "Key not found"
}
```

### Lỗi (401 Unauthorized)

```json
{
  "message": "Invalid API key"
}
```

### Lỗi (403 Forbidden)

```json
{
  "message": "You don't have permission to reset this key"
}
```

## Demo PHP cURL

```php
<?php

$apiKey = 'YOUR_API_KEY';
$keyToReset = 'KEY1-XXXX-XXXX-XXXX'; // Thay thế bằng key thực tế
$url = 'https://api.authtool.app/public/v1/key/' . $keyToReset . '/reset';

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'PATCH',
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-API-Key: ' . $apiKey
    ],
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";

// Parse response
$result = json_decode($response, true);
if ($httpCode === 200) {
    echo "Key reset successfully!\n";
    echo "Reset count: " . ($result['resetCount'] ?? 'N/A') . "\n";
} else {
    echo "Error: " . ($result['message'] ?? 'Unknown error') . "\n";
}

?>
```

## Ghi chú

- Khi reset key, tất cả các thiết bị đã kích hoạt bằng key này sẽ bị xóa
- Số lần kích hoạt của key sẽ được đặt về 0
- `resetCount` trong response cho biết số lần key đã được reset (bao gồm lần reset hiện tại)
- Key phải thuộc về tài khoản của bạn mới có thể reset
- Thời gian hiệu lực và số lần kích hoạt tối đa của key không thay đổi
