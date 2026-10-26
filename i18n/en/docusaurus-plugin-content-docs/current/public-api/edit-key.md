---
sidebar_position: 9
---

# Update key expiry

This API endpoint allows you to change the expiration date of a key, and optionally apply the new date to every device that has activated it.

## Endpoint

```
PATCH https://api.authtool.app/public/v1/key/{key}
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Parameters

### Path Parameters

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `key`     | string | Yes      | The key value to update |

### Request Body

| Field         | Type    | Required | Description                                                                                             |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `expiredAt`   | string  | Yes      | New expiration date of the key (ISO 8601, e.g. `2025-12-31T23:59:59.000Z`)                              |
| `syncDevices` | boolean | No       | Set to `true` to also set the expiration date of every activated device to `expiredAt`. Default `false` |

## Request Example

### cURL

```bash
curl -X PATCH "https://api.authtool.app/public/v1/key/ABC123XYZ" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "expiredAt": "2025-12-31T23:59:59.000Z",
    "syncDevices": true
  }'
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ";
$data = [
    "expiredAt" => "2025-12-31T23:59:59.000Z",
    "syncDevices" => true
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

### Success (200)

```json
{
  "message": "Update successfully"
}
```

### Errors

#### Key Not Found (404)

```json
{
  "message": "Key not found"
}
```

#### Validation Error (400)

`expiredAt` is missing or not a valid date, or `syncDevices` is not a boolean:

```json
{
  "code": 400,
  "message": "\"expiredAt\" is required"
}
```

#### Unauthorized (401)

```json
{
  "message": "Unauthorized"
}
```

## Notes

- You can only update keys that belong to your account
- Without `syncDevices` (or with `false`), only the key's expiration date changes; activated devices keep their current expiration
- With `syncDevices: true`, every activated device gets `expiredAt` as its expiration date, including devices that had already expired
- You can verify the result with the [Key details](./key-detail) API
