---
sidebar_position: 8
---

# Delete key

This API endpoint allows you to delete a specific key. The endpoint requires authentication via Public API Key and IP whitelist verification.

## Endpoint

```
DELETE https://api.authtool.app/public/v1/key/{key}
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
| `key`     | string | Yes      | The key value to delete        |

## Request Example

### cURL

```bash
curl -X DELETE "https://api.authtool.app/public/v1/key/ABC123XYZ" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key"
```

### PHP (cURL)

```php
<?php
$url = "https://api.authtool.app/public/v1/key/ABC123XYZ";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
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
  "message": "Key deleted successfully"
}
```

### Error Responses

#### Key Not Found (404)

```json
{
  "message": "Key not found"
}
```

#### Unauthorized (401)

```json
{
  "message": "Unauthorized"
}
```
