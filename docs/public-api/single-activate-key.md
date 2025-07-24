---
sidebar_position: 3
---

# Tạo key kích hoạt một lần

API này cho phép tạo key có thể kích hoạt chỉ một lần duy nhất.

## Endpoint

```
POST https://api.authtool.app/public/v1/key/single-activate
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Request Body

| Tham số       | Kiểu     | Bắt buộc | Mô tả                                                               |
| ------------- | -------- | -------- | ------------------------------------------------------------------- |
| `quantity`    | number   | ✅       | Số lượng key cần tạo (1-999)                                        |
| `packageIds`  | number[] | ✅       | Danh sách ID package cần gán cho key                                |
| `duration`    | number   | ✅       | Thời gian hiệu lực (1-9999)                                         |
| `unit`        | string   | ✅       | Đơn vị thời gian: `hour`, `day`, `week`, `month`, `year`            |
| `alias`       | string   | ❌       | Alias tùy chỉnh cho key (chỉ có hiệu lực với tài khoản pro trở lên) |
| `isCleanable` | boolean  | ❌       | Key có thể tự động xóa khi hết hạn không (mặc định: false)          |

## Ví dụ Request

```json
{
  "quantity": 5,
  "packageIds": [1, 2, 3],
  "duration": 30,
  "unit": "day",
  "alias": "my-custom-alias",
  "isCleanable": true
}
```

## Response

### Thành công (201 Created)

```json
{
  "message": "Create key successfully",
  "data": [
    "KEY1-XXXX-XXXX-XXXX",
    "KEY2-XXXX-XXXX-XXXX",
    "KEY3-XXXX-XXXX-XXXX",
    "KEY4-XXXX-XXXX-XXXX",
    "KEY5-XXXX-XXXX-XXXX"
  ]
}
```

### Lỗi (422 Unprocessable Entity)

```json
{
  "message": "Validation error message"
}
```

### Lỗi (401 Unauthorized)

```json
{
  "message": "Invalid API key"
}
```

## Demo PHP cURL

```php
<?php

$apiKey = 'YOUR_API_KEY';
$url = 'https://api.authtool.app/public/v1/key/single-activate';

$data = [
    'quantity' => 5,
    'packageIds' => [1, 2, 3],
    'duration' => 30,
    'unit' => 'day',
    'alias' => 'my-custom-alias',
    'isCleanable' => true
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($data),
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
if ($httpCode === 201 && isset($result['data'])) {
    echo "Keys created successfully:\n";
    foreach ($result['data'] as $key) {
        echo "- " . $key . "\n";
    }
} else {
    echo "Error: " . ($result['message'] ?? 'Unknown error') . "\n";
}

?>
```

## Ghi chú

- Key được tạo sẽ có số lần kích hoạt tối đa là 1
- Thời gian hiệu lực được tính từ thời điểm tạo key
- Alias chỉ có hiệu lực với tài khoản premium, tài khoản free sẽ sử dụng alias mặc định
- Key có thể được đặt là `isCleanable: true` để tự động xóa khi hết hạn hoặc sau 1 giờ nếu chưa có ngày hết hạn
