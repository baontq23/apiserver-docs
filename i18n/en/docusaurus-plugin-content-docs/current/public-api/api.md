---
sidebar_position: 2
---

# Public API Overview

AuthTool provides a Public API that allows you to integrate and manage keys automatically. The API uses REST architecture with JSON format.

## Base URL

```
https://api.authtool.app
```

## Authentication

All APIs require an API Key in the header:

```
X-API-Key: YOUR_API_KEY
```

You can get your API Key from the [account settings page](https://authtool.app/account-settings/account).

## Available Endpoints

We currently support 4 main API endpoints:

### 1. [Create single-activate key](./single-activate-key)

- **Endpoint**: `POST /public/v1/key/single-activate`
- **Description**: Create a key that can only be activated once

### 2. [Create multiple-activate key](./multiple-activate-key)

- **Endpoint**: `POST /public/v1/key/multiple-activate`
- **Description**: Create a key that can be activated multiple times with custom usage limit

### 3. [Reset key](./reset-key)

- **Endpoint**: `PATCH /public/v1/key/{key}/reset`
- **Description**: Reset key to initial state, removing all activations

### 4. [Key details](./key-detail)

- **Endpoint**: `GET /public/v1/key/{key}/detail`
- **Description**: Get detailed key information and list of activated devices

## Error Handling

The API uses standard HTTP status codes:

- **200**: Success
- **201**: Created successfully
- **400**: Bad Request - Parameter error
- **401**: Unauthorized - Invalid API Key
- **403**: Forbidden - No access permission
- **404**: Not Found - Resource not found
- **422**: Unprocessable Entity - Validation error
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error - Server error

## Content Type

All requests and responses use `application/json`.

## Support

If you encounter any issues with the API, please contact us:

- Email: support@authtool.app
- Telegram: [APIServer Community](https://t.me/apiserver)
- Telegram: [Admin](https://t.me/baontq)
