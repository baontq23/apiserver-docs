---
sidebar_position: 1
---

# Getting API Key

API Key is a required credential to use all API endpoints. This page will guide you through how to obtain and use an API Key.

## Step 1: Register an Account

First, you need to have an account to create an API Key.

1. Visit the [registration page](https://authtool.app/register)
2. Fill in the required information
3. Verify your email
4. Log in to the system

## Step 2: Access Account Information Page

After successfully logging in to [authtool.app](https://authtool.app), you need to access the account information page to get your API Key.

![Access account information page](./img/step-2.png)

## Step 3: Find and Copy API Key

In the account information page, you will see your API Key:

![Find and copy API Key](./img/step-3.png)

:::warning Important

- This API Key is **unique** and **secret** to you
- **Do not share** your API Key with anyone
  :::

:::note Note

- Replace `YOUR_API_KEY_HERE` with your actual API Key
- The `x-api-key` header must be added to **every request** to the API
- If this header is missing or the API Key is invalid, the request will return a 401 Unauthorized error
  :::
