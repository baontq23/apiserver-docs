---
sidebar_position: 4
---

# Create multiple-activate key

This API allows you to create keys that can be activated multiple times with a custom usage limit.

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

| Parameter       | Type     | Required | Description                                                                |
| --------------- | -------- | -------- | -------------------------------------------------------------------------- |
| `quantity`      | number   | ✅       | Number of keys to create (1-999)                                           |
| `packageIds`    | number[] | ✅       | List of package IDs to assign to the key                                   |
| `duration`      | number   | ✅       | Validity duration (1-9999)                                                 |
| `unit`          | string   | ✅       | Time unit: `hour`, `day`, `week`, `month`, `year`                          |
| `activateCount` | number   | ✅       | Maximum activation count (2-9999999)                                       |
| `endDate`       | string   | ✅       | Key expiration date (ISO 8601 format)                                      |
| `alias`         | string   | ❌       | Custom alias for the key (only effective for pro accounts and above)       |
| `isCleanable`   | boolean  | ❌       | Whether the key can be automatically deleted when expired (default: false) |

## Example Request

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

### Success (201 Created)

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

### Error (422 Unprocessable Entity)

```json
{
  "message": "Validation error message"
}
```

### Error (401 Unauthorized)

```json
{
  "message": "Invalid API key"
}
```

## PHP cURL Demo

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

## Notes

- Created keys will have a maximum activation count according to `activateCount` (minimum 2 times)
- `endDate` is the final expiration date of the key and must be a future date
- Each activation will have a validity duration according to `duration` and `unit`
- Alias is only effective for premium accounts; free accounts will use the default alias
- Keys cannot be used when they reach `activateCount` or exceed `endDate`
