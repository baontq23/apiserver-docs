---
sidebar_position: 4
title: Tích hợp thư viện tĩnh trên iOS
---

# Tích hợp `libAPIClient.a` vào ứng dụng iOS

Thư viện APIClient xử lý luồng xác thực cho các chức năng cần bảo vệ. Khi dùng thư viện, bạn không cần tự gọi các endpoint Client API hoặc tự triển khai mã hóa. Hướng dẫn này áp dụng cho project iOS dùng Objective-C; project dùng Swift có thể gọi qua Objective-C bridging header.

## Chuẩn bị

- Tạo package trên [APIServer](https://authtool.app/) và lấy **package token** (không phải API key của Public API).
- Tải **`APIClient.h` và `libAPIClient.a` từ cùng một phiên bản** tại [trang Releases](https://github.com/baontq23/Logos-API-Authentication/releases). Gói "Source code" không chứa file `.a` cần link. Ví dụ bên dưới dùng API của [v6.1.0](https://github.com/baontq23/Logos-API-Authentication/releases/tag/v6.1.0); với phiên bản khác, hãy đối chiếu header đi kèm.

## 1. Thêm header và thư viện vào project

Thêm `APIClient.h` và `libAPIClient.a` vào project, ví dụ trong thư mục `API/`. Trong Xcode, thêm file `.a` vào target ở **Build Phases > Link Binary With Libraries**; cấu hình đường dẫn header (hoặc dùng đường dẫn tương đối khi `#import`). Thư viện tĩnh được link vào binary, **không** thêm vào **Embed Frameworks**.

Nếu project dùng Swift, thêm `#import "APIClient.h"` vào Objective-C bridging header của target. Đảm bảo bản `.a` chứa kiến trúc tương ứng với thiết bị bạn build; bản chỉ hỗ trợ thiết bị có thể không link được khi build cho Simulator.

## 2. Chỉ bật chức năng sau khi xác thực

Ví dụ trong một `UIViewController` Objective-C (thay `YOUR_PACKAGE_TOKEN` bằng package token của bạn):

```objectivec
#import <UIKit/UIKit.h>
#import "API/APIClient.h"

@implementation ProtectedViewController {
    BOOL _authenticationStarted;
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    if (_authenticationStarted) return;
    _authenticationStarted = YES;

    apiclient_set_token("YOUR_PACKAGE_TOKEN");
    apiclient_set_language("vi"); // Hoặc "en".

    __weak typeof(self) weakSelf = self;
    apiclient_paid(^{
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf startProtectedFeature];
        });
    });
}

- (void)startProtectedFeature {
    // Bật các chức năng chỉ dành cho người dùng đã xác thực.
}

@end
```

`apiclient_paid` xử lý xác thực và gọi callback khi được cấp quyền. **Không** bật chức năng cần bảo vệ ngoài callback; gọi `apiclient_set_token` trước `apiclient_paid`. Nếu dùng Swift, khai báo bridging header như trên rồi gọi các hàm `apiclient_*` tương ứng từ Swift.

## 3. Build và kiểm tra

Build target cho thiết bị iOS tương thích, chạy ứng dụng và thử cả key hợp lệ lẫn không hợp lệ. Chức năng được bảo vệ chỉ nên chạy sau khi callback được gọi. Nếu gặp lỗi linker, kiểm tra cặp header/thư viện cùng phiên bản, đường dẫn tới `.a`, kiến trúc của thư viện và các framework/thư viện hệ thống được báo thiếu trong lỗi linker.

:::note
Package token được nhúng vào binary và có thể bị trích xuất; đừng thay bằng API key quản trị hoặc secret phía server. Các phiên bản cũ có thể dùng lớp Objective-C `APIClient` và `[API paid:]`; với header v6.1.0 hãy dùng các hàm `apiclient_*` như trên.
:::
