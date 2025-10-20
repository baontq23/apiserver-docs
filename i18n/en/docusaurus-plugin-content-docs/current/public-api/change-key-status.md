---
sidebar_position: 7
---

# Change key status

This API endpoint allows you to change the status of a specific key. The endpoint requires authentication via Public API Key and IP whitelist verification.

## Endpoint

```
PATCH https://api.authtool.app/public/v1/key/{key}/change-status
```

## Headers

```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Parameters

### Path Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `key`     | string | Yes      | The key value to change status |

### Request Body

| Field    | Type   | Required | Description                                            |
| -------- | ------ | -------- | ------------------------------------------------------ |
| `status` | number | Yes      | New status value for the key (0: Disabled, 1: Enabled) |

## Request Example

### cURL

```bash
curl -X PATCH "https://api.authtool.app/public/v1/key/ABC123XYZ/change-status" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "status": 1
  }'
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ/change-status";
$data = [
    "status" => 1
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

### Success Response (200)

```json
{
  "message": "Key status changed successfully"
}
```

### Error Responses

#### Key Not Found (404)

```json
{
  "message": "Key not found"
}
```

#### Validation Error (400)

```json
{
  "message": "Validation error",
  "details": "status is required"
}
```

#### Unauthorized (401)

```json
{
  "message": "Unauthorized"
}
```
