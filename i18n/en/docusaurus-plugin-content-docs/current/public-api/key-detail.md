---
sidebar_position: 6
---

# Key details

This API allows you to get detailed information about a key and the list of activated devices.

## Endpoint

```
GET https://api.authtool.app/public/v1/key/{key}/detail
```

## Headers

```
X-API-Key: YOUR_API_KEY
```

## Path Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `key`     | string | ✅       | Key code to get details for |

## Example Request

```
GET https://api.authtool.app/public/v1/key/KEY1-XXXX-XXXX-XXXX/detail
```

## Response

### Success (200 OK)

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

### Error (404 Not Found)

```json
{
  "message": "Key not found"
}
```

### Error (401 Unauthorized)

```json
{
  "message": "Invalid API key"
}
```

### Error (403 Forbidden)

```json
{
  "message": "You don't have permission to access this key"
}
```

## Response Description

### Key Object

| Field           | Type    | Description                                        |
| --------------- | ------- | -------------------------------------------------- |
| `activateCount` | number  | Number of times activated                          |
| `activateLimit` | number  | Maximum activation count                           |
| `unit`          | string  | Time unit (`hour`, `day`, `week`, `month`, `year`) |
| `duration`      | number  | Validity duration                                  |
| `expiredAt`     | string  | Key expiration date (ISO 8601)                     |
| `isExpired`     | boolean | Whether the key has expired                        |

### Device Object

| Field       | Type    | Description                                |
| ----------- | ------- | ------------------------------------------ |
| `uid`       | string  | Unique identifier of the device            |
| `expireAt`  | string  | Activation expiration date (ISO 8601)      |
| `activeAt`  | string  | Activation date (ISO 8601)                 |
| `isExpired` | boolean | Whether the activation has expired         |
| `status`    | number  | Activation status (1: active, 0: inactive) |

## PHP cURL Demo

```php
<?php

$apiKey = 'YOUR_API_KEY';
$keyToCheck = 'KEY1-XXXX-XXXX-XXXX'; // Replace with actual key
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

## Notes

- This API only returns information for keys that belong to your account
- The devices list includes all devices that have ever been activated with this key
- `isExpired` indicates the current status of the key/device based on server time
- Status 1 = active, 0 = inactive/revoked
