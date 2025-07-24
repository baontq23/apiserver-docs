---
sidebar_position: 6
---

# Chi tiết key

API này cho phép lấy thông tin chi tiết của một key và danh sách các thiết bị đã kích hoạt.

## Endpoint

```
GET https://api.authtool.app/public/v1/key/{key}/detail
```

## Headers

```
X-API-Key: YOUR_API_KEY
```

## Path Parameters

| Tham số | Kiểu   | Bắt buộc | Mô tả                    |
| ------- | ------ | -------- | ------------------------ |
| `key`   | string | ✅       | Mã key cần lấy thông tin |

## Ví dụ Request

```
GET https://api.authtool.app/public/v1/key/KEY1-XXXX-XXXX-XXXX/detail
```

## Response

### Thành công (200 OK)

```json
{
  "key": {
    "activateCount": 2,
    "activateLimit": 10,
    "unit": "day",
    "duration": 30,
    "expiredAt": "2024-12-31T23:59:59.000Z",
    "isExpired": false
  },
  "devices": [
    {
      "uid": "DEVICE-UUID-1234-5678",
      "expireAt": "2024-02-15T10:30:00.000Z",
      "activeAt": "2024-01-16T10:30:00.000Z",
      "isExpired": false,
      "status": 1
    },
    {
      "uid": "DEVICE-UUID-5678-9012",
      "expireAt": "2024-02-10T14:20:00.000Z",
      "activeAt": "2024-01-11T14:20:00.000Z",
      "isExpired": true,
      "status": 0
    }
  ]
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
  "message": "You don't have permission to access this key"
}
```

## Mô tả Response

### Key Object

| Trường          | Kiểu    | Mô tả                                                     |
| --------------- | ------- | --------------------------------------------------------- |
| `activateCount` | number  | Số lần đã kích hoạt                                       |
| `activateLimit` | number  | Số lần kích hoạt tối đa                                   |
| `unit`          | string  | Đơn vị thời gian (`hour`, `day`, `week`, `month`, `year`) |
| `duration`      | number  | Thời gian hiệu lực                                        |
| `expiredAt`     | string  | Ngày hết hạn của key (ISO 8601)                           |
| `isExpired`     | boolean | Key đã hết hạn chưa                                       |

### Device Object

| Trường      | Kiểu    | Mô tả                                         |
| ----------- | ------- | --------------------------------------------- |
| `uid`       | string  | Unique identifier của thiết bị                |
| `expireAt`  | string  | Ngày hết hạn kích hoạt (ISO 8601)             |
| `activeAt`  | string  | Ngày kích hoạt (ISO 8601)                     |
| `isExpired` | boolean | Kích hoạt đã hết hạn chưa                     |
| `status`    | number  | Trạng thái kích hoạt (1: active, 0: inactive) |

## Demo PHP cURL

```php
<?php

$apiKey = 'YOUR_API_KEY';
$keyToCheck = 'KEY1-XXXX-XXXX-XXXX'; // Thay thế bằng key thực tế
$url = 'https://api.authtool.app/public/v1/key/' . $keyToCheck . '/detail';

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => [
        'X-API-Key: ' . $apiKey
    ],
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";

// Parse and display response
$result = json_decode($response, true);
if ($httpCode === 200) {
    $key = $result['key'];
    $devices = $result['devices'];

    echo "\n=== KEY INFORMATION ===\n";
    echo "Activate Count: " . $key['activateCount'] . "/" . $key['activateLimit'] . "\n";
    echo "Duration: " . $key['duration'] . " " . $key['unit'] . "\n";
    echo "Expired At: " . $key['expiredAt'] . "\n";
    echo "Is Expired: " . ($key['isExpired'] ? 'Yes' : 'No') . "\n";

    echo "\n=== ACTIVATED DEVICES ===\n";
    if (empty($devices)) {
        echo "No devices activated yet.\n";
    } else {
        foreach ($devices as $device) {
            echo "Device ID: " . $device['uid'] . "\n";
            echo "  - Activated: " . $device['activeAt'] . "\n";
            echo "  - Expires: " . $device['expireAt'] . "\n";
            echo "  - Status: " . ($device['status'] ? 'Active' : 'Inactive') . "\n";
            echo "  - Is Expired: " . ($device['isExpired'] ? 'Yes' : 'No') . "\n";
            echo "---\n";
        }
    }
} else {
    echo "Error: " . ($result['message'] ?? 'Unknown error') . "\n";
}

?>
```

## Ghi chú

- API này chỉ trả về thông tin của key thuộc về tài khoản của bạn
- Danh sách devices bao gồm tất cả các thiết bị đã từng kích hoạt với key này
- `isExpired` cho biết trạng thái hiện tại của key/device dựa trên thời gian server
- Status 1 = active, 0 = inactive/revoked
