---
sidebar_position: 3
---

# Create single-activate key

This API allows you to create keys that can only be activated once.

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

| Parameter     | Type     | Required | Description                                                                |
| ------------- | -------- | -------- | -------------------------------------------------------------------------- |
| `quantity`    | number   | ✅       | Number of keys to create (1-999)                                           |
| `packageIds`  | number[] | ✅       | List of package IDs to assign to the key                                   |
| `duration`    | number   | ✅       | Validity duration (1-9999)                                                 |
| `unit`        | string   | ✅       | Time unit: `hour`, `day`, `week`, `month`, `year`                          |
| `alias`       | string   | ❌       | Custom alias for the key (only effective for pro accounts and above)       |
| `isCleanable` | boolean  | ❌       | Whether the key can be automatically deleted when expired (default: false) |

## Example Request

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

### Success (201 Created)

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

## Notes

- Created keys will have a maximum activation count of 1
- Validity duration is calculated from the time the key is created
- Alias is only effective for premium accounts; free accounts will use the default alias
- Keys can be set to `isCleanable: true` to be automatically deleted when expired or after 1 hour if no expiration date is set
