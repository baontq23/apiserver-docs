---
sidebar_position: 4
title: Integrate the static library on iOS
---

# Integrate `libAPIClient.a` into an iOS app

APIClient handles authentication for protected features. You do not need to call the Client API endpoints or implement encryption yourself when using the library. This guide applies to Objective-C iOS projects; Swift projects can use an Objective-C bridging header.

## Prerequisites

- Create a package on [APIServer](https://authtool.app/) and get its **package token** (not a Public API key).
- Download **`APIClient.h` and `libAPIClient.a` from the same version** on the [Releases page](https://github.com/baontq23/Logos-API-Authentication/releases). The "Source code" archive does not contain the `.a` file you need to link. The example below uses the API from [v6.1.0](https://github.com/baontq23/Logos-API-Authentication/releases/tag/v6.1.0); check the accompanying header for other versions.

## 1. Add the header and library to your project

Add `APIClient.h` and `libAPIClient.a` to your project, for example under `API/`. In Xcode, add the `.a` file to the target's **Build Phases > Link Binary With Libraries** and configure the header search path (or use a relative path in `#import`). A static library is linked into the binary; do **not** add it to **Embed Frameworks**.

For Swift projects, add `#import "APIClient.h"` to the target's Objective-C bridging header. Ensure the `.a` file contains the architecture of your build target; a device-only library may not link for Simulator builds.

## 2. Start protected features after authentication

Example in an Objective-C `UIViewController` (replace `YOUR_PACKAGE_TOKEN` with your package token):

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
    apiclient_set_language("en"); // Or "vi".

    __weak typeof(self) weakSelf = self;
    apiclient_paid(^{
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf startProtectedFeature];
        });
    });
}

- (void)startProtectedFeature {
    // Enable features for authenticated users here.
}

@end
```

`apiclient_paid` handles authentication and calls the callback when access is granted. **Do not** enable protected features outside the callback; call `apiclient_set_token` before `apiclient_paid`. In Swift, configure the bridging header as described above and call the corresponding `apiclient_*` functions from Swift.

## 3. Build and test

Build for a compatible iOS device and test with both valid and invalid keys. Protected features should run only after the callback fires. For linker errors, check that the header and library come from the same release, the `.a` file path and architecture are correct, and whether the linker reports any missing system frameworks or libraries.

:::note
The package token is embedded in the binary and can be extracted; do not replace it with an admin API key or server-side secret. Older versions may use an Objective-C `APIClient` class and `[API paid:]`; with the v6.1.0 header, use the `apiclient_*` functions shown here.
:::
