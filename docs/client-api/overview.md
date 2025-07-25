---
sidebar_position: 1
---

# Client API Overview

Client API là bộ API dành cho việc tích hợp vào mobile applications

## Bắt đầu

1. **Lấy Package Token**: Truy cập trang list package để lấy package token và tạo aes key
2. **Tích hợp Encryption**: Implement mã hóa AES trong app

## API Endpoints

| Endpoint   | Method | Mục đích                   |
| ---------- | ------ | -------------------------- |
| `/package` | POST   | Kiểm tra thông tin package |
| `/check`   | POST   | Kiểm tra device            |
| `/login`   | POST   | Login với key              |
