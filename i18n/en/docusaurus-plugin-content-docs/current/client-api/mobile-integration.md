---
sidebar_position: 2
---

# Client API for Mobile App Integration

## Base URL

```
POST https://api.authtool.app/public/v1/client/
```

## Integration Flow

### 1. Check Package (Optional)

### 2. Check Device (Required)

### 3. Login with Key (When needed)

## API Reference

### 1. Check Package

**Endpoint:** `POST /package`

**Description:** Check package information, version, active status

**Request Body:**

```json
{
  "token": "your_package_token_here"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Data after decryption:**

```json
{
  "status": 1, // 1: Running, 0: Maintenance
  "name": "Package Name",
  "version": "1.0.0",
  "updateNote": "Update notes",
  "downloadUpdateLink": "https://...",
  "contactUrl": "https://...",
  "isNeedKey": true, // Whether authentication is required
  "requestTime": 1234567890
}
```

**Error Responses:**

- `400` - Package token invalid
- `403` - Package stopped by admin
- `404` - Package not found

### 2. Check Device (Required)

**Endpoint:** `POST /check`

**Description:** Check if device already has an existing license. This API must be called first when user opens the app.

**Request Body:**

```json
{
  "token": "your_package_token_here",
  "data": "encrypted_device_info"
}
```

**Data before encryption:**

```json
{
  "uid": "unique_device_id", // UDID or unique identifier
  "clientOS": "iOS 17.0",
  "clientModel": "iPhone 15 Pro",
  "clientOSVersion": "17.0.1"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Data after decryption:**

```json
{
  "status": 1, // 1: Active, 0: Inactive
  "expiredAt": "2024-12-31T23:59:59.000Z",
  "key": "user_key_value",
  "requestTime": 1234567890,
  "isExpired": false
}
```

**Error Responses:**

- `400` - UID is required
- `404` - Device not found (need to call login API)

### 3. Login with Key

**Endpoint:** `POST /login`

**Description:** Login with key to activate license for device

**Request Body:**

```json
{
  "token": "your_package_token_here",
  "data": "encrypted_login_data"
}
```

**Data before encryption:**

```json
{
  "uid": "unique_device_id",
  "key": "user_input_key",
  "clientOS": "iOS 17.0",
  "clientModel": "iPhone 15 Pro",
  "clientOSVersion": "17.0.1"
}
```

**Response Success (200):**

```json
{
  "data": "encrypted_data"
}
```

**Data after decryption:**

```json
{
  "status": 1, // 1: Success
  "expiredAt": "2024-12-31T23:59:59.000Z",
  "key": "activated_key_value",
  "requestTime": 1234567890,
  "message": "Login successful"
}
```

**Error Responses:**

- `400` - Key is required / Key disabled
- `404` - Key not found
- `409` - Key has reached device limit

## Security Notes

1. **Package Token**: Store securely, do not expose in code
2. **AES Key**: Receive from server when setting up package
3. **Device UID**: Use unique identifier to optimize and avoid having to reset key
4. **Data Encryption**: All data must be encrypted
