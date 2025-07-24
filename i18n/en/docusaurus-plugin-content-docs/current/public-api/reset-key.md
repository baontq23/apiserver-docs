---
sidebar_position: 5
---

# Reset key

This API allows you to reset a key to its initial state, removing all used activations.

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

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `key`     | string | ✅       | Key code to reset |

## Example Request

```
PATCH https://api.authtool.app/public/v1/key/KEY1-XXXX-XXXX-XXXX/reset
```

## Request Body

No request body is required for this API.

## Response

### Success (200 OK)

```json
{
  "message": "Reset successfully",
  "resetCount": 3
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
  "message": "You don't have permission to reset this key"
}
```

## PHP cURL Demo

```php
<?php

$apiKey = 'YOUR_API_KEY';
$keyToReset = 'KEY1-XXXX-XXXX-XXXX'; // Replace with actual key
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

## Notes

- When resetting a key, all devices that were activated with this key will be removed
- The key's activation count will be reset to 0
- `resetCount` in the response indicates how many times the key has been reset (including the current reset)
- The key must belong to your account to be able to reset it
- The key's validity duration and maximum activation count remain unchanged
