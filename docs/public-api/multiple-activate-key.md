---
sidebar_position: 4
---

# Tạo key kích hoạt nhiều lần

API này cho phép tạo key có thể kích hoạt nhiều lần với số lần sử dụng tùy chỉnh.

## Endpoint

```
POST https://api.authtool.app/public/v1/key/multiple-activate
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Request Body

| Tham số         | Kiểu     | Bắt buộc | Mô tả                                                               |
| --------------- | -------- | -------- | ------------------------------------------------------------------- |
| `quantity`      | number   | ✅       | Số lượng key cần tạo (1-999)                                        |
| `packageIds`    | number[] | ✅       | Danh sách ID package cần gán cho key                                |
| `duration`      | number   | ✅       | Thời gian hiệu lực (1-9999)                                         |
| `unit`          | string   | ✅       | Đơn vị thời gian: `hour`, `day`, `week`, `month`, `year`            |
| `activateCount` | number   | ✅       | Số lần kích hoạt tối đa (2-9999999)                                 |
| `endDate`       | string   | ✅       | Ngày hết hạn của key (ISO 8601 format)                              |
| `alias`         | string   | ❌       | Alias tùy chỉnh cho key (chỉ có hiệu lực với tài khoản pro trở lên) |
| `isCleanable`   | boolean  | ❌       | Key có thể tự động xóa khi hết hạn không (mặc định: false)          |

## Ví dụ Request

```json
{
  "quantity": 3,
  "packageIds": [1, 2, 3],
  "duration": 7,
  "unit": "day",
  "activateCount": 10,
  "endDate": "2024-12-31T23:59:59Z",
  "alias": "my-multi-key",
  "isCleanable": false
}
```

## Response

### Thành công (201 Created)

```json
{
  "message": "Create key successfully",
  "data": [
    "KEY1-MULTI-XXXX-XXXX",
    "KEY2-MULTI-XXXX-XXXX",
    "KEY3-MULTI-XXXX-XXXX"
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
$url = 'https://api.authtool.app/public/v1/key/multiple-activate';

$data = [
    'quantity' => 3,
    'packageIds' => [1, 2, 3],
    'duration' => 7,
    'unit' => 'day',
    'activateCount' => 10,
    'endDate' => '2024-12-31T23:59:59Z',
    'alias' => 'my-multi-key',
    'isCleanable' => false
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
    echo "Multiple activate keys created successfully:\n";
    foreach ($result['data'] as $key) {
        echo "- " . $key . " (can activate " . $data['activateCount'] . " times)\n";
    }
} else {
    echo "Error: " . ($result['message'] ?? 'Unknown error') . "\n";
}

?>
```

## Ghi chú

- Key được tạo sẽ có số lần kích hoạt tối đa theo `activateCount` (tối thiểu 2 lần)
- `endDate` là ngày hết hạn cuối cùng của key, phải là ngày trong tương lai
- Mỗi lần kích hoạt sẽ có thời gian hiệu lực theo `duration` và `unit`
- Alias chỉ có hiệu lực với tài khoản premium, tài khoản free sẽ sử dụng alias mặc định
- Key sẽ không thể sử dụng khi đạt đến `activateCount` hoặc vượt quá `endDate`
