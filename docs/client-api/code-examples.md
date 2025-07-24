---
sidebar_position: 3
---

# Code Examples

## iOS (Swift)

### AES Encryption Helper

```swift
import CryptoKit
import Foundation

class AESHelper {
    static func encrypt(data: String, key: String) -> String? {
        guard let keyData = key.data(using: .utf8),
              let dataToEncrypt = data.data(using: .utf8) else {
            return nil
        }

        let symmetricKey = SymmetricKey(data: keyData)

        do {
            let sealedBox = try AES.GCM.seal(dataToEncrypt, using: symmetricKey)
            return sealedBox.combined?.base64EncodedString()
        } catch {
            print("Encryption error: \(error)")
            return nil
        }
    }

    static func decrypt(encryptedData: String, key: String) -> String? {
        guard let keyData = key.data(using: .utf8),
              let dataToDecrypt = Data(base64Encoded: encryptedData) else {
            return nil
        }

        let symmetricKey = SymmetricKey(data: keyData)

        do {
            let sealedBox = try AES.GCM.SealedBox(combined: dataToDecrypt)
            let decryptedData = try AES.GCM.open(sealedBox, using: symmetricKey)
            return String(data: decryptedData, encoding: .utf8)
        } catch {
            print("Decryption error: \(error)")
            return nil
        }
    }
}
```

### API Client

```swift
class APIClient {
    private let baseURL = "https://api.authtool.app/api/public/v1/client"
    private let packageToken = "your_package_token_here"
    private let aesKey = "your_aes_key_here"

    func checkPackage() async throws -> PackageInfo {
        let url = URL(string: "\(baseURL)/package")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body = ["token": packageToken]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(APIResponse.self, from: data)

        guard let decryptedData = AESHelper.decrypt(encryptedData: response.data, key: aesKey),
              let packageInfo = try? JSONDecoder().decode(PackageInfo.self, from: decryptedData.data(using: .utf8)!) else {
            throw APIError.decryptionFailed
        }

        return packageInfo
    }

    func checkDevice(uid: String) async throws -> DeviceInfo {
        let deviceData = DeviceData(
            uid: uid,
            clientOS: UIDevice.current.systemName + " " + UIDevice.current.systemVersion,
            clientModel: UIDevice.current.model,
            clientOSVersion: UIDevice.current.systemVersion
        )

        guard let jsonData = try? JSONEncoder().encode(deviceData),
              let jsonString = String(data: jsonData, encoding: .utf8),
              let encryptedData = AESHelper.encrypt(data: jsonString, key: aesKey) else {
            throw APIError.encryptionFailed
        }

        let url = URL(string: "\(baseURL)/check")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body = [
            "token": packageToken,
            "data": encryptedData
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(APIResponse.self, from: data)

        guard let decryptedData = AESHelper.decrypt(encryptedData: response.data, key: aesKey),
              let deviceInfo = try? JSONDecoder().decode(DeviceInfo.self, from: decryptedData.data(using: .utf8)!) else {
            throw APIError.decryptionFailed
        }

        return deviceInfo
    }

    func login(uid: String, key: String) async throws -> LoginResult {
        let loginData = LoginData(
            uid: uid,
            key: key,
            clientOS: UIDevice.current.systemName + " " + UIDevice.current.systemVersion,
            clientModel: UIDevice.current.model,
            clientOSVersion: UIDevice.current.systemVersion
        )

        guard let jsonData = try? JSONEncoder().encode(loginData),
              let jsonString = String(data: jsonData, encoding: .utf8),
              let encryptedData = AESHelper.encrypt(data: jsonString, key: aesKey) else {
            throw APIError.encryptionFailed
        }

        let url = URL(string: "\(baseURL)/login")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body = [
            "token": packageToken,
            "data": encryptedData
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(APIResponse.self, from: data)

        guard let decryptedData = AESHelper.decrypt(encryptedData: response.data, key: aesKey),
              let loginResult = try? JSONDecoder().decode(LoginResult.self, from: decryptedData.data(using: .utf8)!) else {
            throw APIError.decryptionFailed
        }

        return loginResult
    }
}
```

### Data Models

```swift
struct PackageInfo: Codable {
    let status: Int
    let name: String
    let version: String
    let updateNote: String?
    let downloadUpdateLink: String?
    let contactUrl: String?
    let isNeedKey: Bool
    let requestTime: Int64
}

struct DeviceData: Codable {
    let uid: String
    let clientOS: String
    let clientModel: String
    let clientOSVersion: String
}

struct DeviceInfo: Codable {
    let status: Int
    let expiredAt: String
    let key: String
    let requestTime: Int64
    let isExpired: Bool
}

struct LoginData: Codable {
    let uid: String
    let key: String
    let clientOS: String
    let clientModel: String
    let clientOSVersion: String
}

struct LoginResult: Codable {
    let status: Int
    let expiredAt: String
    let key: String
    let requestTime: Int64
    let message: String?
}

struct APIResponse: Codable {
    let data: String
}

enum APIError: Error {
    case encryptionFailed
    case decryptionFailed
    case networkError
    case invalidResponse
}
```

## iOS (Objective-C)

### AES Encryption Helper

```objc
#import <CommonCrypto/CommonCryptor.h>
#import <Foundation/Foundation.h>

@interface AESHelper : NSObject

+ (NSString *)encryptData:(NSString *)data withKey:(NSString *)key;
+ (NSString *)decryptData:(NSString *)encryptedData withKey:(NSString *)key;

@end

@implementation AESHelper

+ (NSString *)encryptData:(NSString *)data withKey:(NSString *)key {
    NSData *keyData = [key dataUsingEncoding:NSUTF8StringEncoding];
    NSData *dataToEncrypt = [data dataUsingEncoding:NSUTF8StringEncoding];

    size_t bufferSize = [dataToEncrypt length] + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);

    size_t numBytesEncrypted = 0;
    CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt,
                                         kCCAlgorithmAES,
                                         kCCOptionPKCS7Padding,
                                         [keyData bytes],
                                         kCCKeySizeAES256,
                                         NULL,
                                         [dataToEncrypt bytes],
                                         [dataToEncrypt length],
                                         buffer,
                                         bufferSize,
                                         &numBytesEncrypted);

    if (cryptStatus == kCCSuccess) {
        NSData *encryptedData = [NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted];
        return [encryptedData base64EncodedStringWithOptions:0];
    }

    free(buffer);
    return nil;
}

+ (NSString *)decryptData:(NSString *)encryptedData withKey:(NSString *)key {
    NSData *keyData = [key dataUsingEncoding:NSUTF8StringEncoding];
    NSData *dataToDecrypt = [[NSData alloc] initWithBase64EncodedString:encryptedData options:0];

    size_t bufferSize = [dataToDecrypt length] + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);

    size_t numBytesDecrypted = 0;
    CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt,
                                         kCCAlgorithmAES,
                                         kCCOptionPKCS7Padding,
                                         [keyData bytes],
                                         kCCKeySizeAES256,
                                         NULL,
                                         [dataToDecrypt bytes],
                                         [dataToDecrypt length],
                                         buffer,
                                         bufferSize,
                                         &numBytesDecrypted);

    if (cryptStatus == kCCSuccess) {
        NSData *decryptedData = [NSData dataWithBytesNoCopy:buffer length:numBytesDecrypted];
        return [[NSString alloc] initWithData:decryptedData encoding:NSUTF8StringEncoding];
    }

    free(buffer);
    return nil;
}

@end
```

### API Client

```objc
@interface APIClient : NSObject

@property (nonatomic, strong) NSString *baseURL;
@property (nonatomic, strong) NSString *packageToken;
@property (nonatomic, strong) NSString *aesKey;

- (void)checkPackageWithCompletion:(void (^)(NSDictionary *result, NSError *error))completion;
- (void)checkDeviceWithUID:(NSString *)uid completion:(void (^)(NSDictionary *result, NSError *error))completion;
- (void)loginWithUID:(NSString *)uid key:(NSString *)key completion:(void (^)(NSDictionary *result, NSError *error))completion;

@end

@implementation APIClient

- (instancetype)init {
    self = [super init];
    if (self) {
        self.baseURL = @"https://api.authtool.app/api/public/v1/client";
        self.packageToken = @"your_package_token_here";
        self.aesKey = @"your_aes_key_here";
    }
    return self;
}

- (void)checkPackageWithCompletion:(void (^)(NSDictionary *result, NSError *error))completion {
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@/package", self.baseURL]];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

    NSDictionary *body = @{@"token": self.packageToken};
    NSError *error;
    NSData *bodyData = [NSJSONSerialization dataWithJSONObject:body options:0 error:&error];
    [request setHTTPBody:bodyData];

    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            completion(nil, error);
            return;
        }

        NSError *jsonError;
        NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
        NSString *encryptedData = jsonResponse[@"data"];

        NSString *decryptedData = [AESHelper decryptData:encryptedData withKey:self.aesKey];
        if (decryptedData) {
            NSData *decryptedJsonData = [decryptedData dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *result = [NSJSONSerialization JSONObjectWithData:decryptedJsonData options:0 error:nil];
            completion(result, nil);
        } else {
            completion(nil, [NSError errorWithDomain:@"DecryptionError" code:1 userInfo:nil]);
        }
    }];
    [task resume];
}

- (void)checkDeviceWithUID:(NSString *)uid completion:(void (^)(NSDictionary *result, NSError *error))completion {
    UIDevice *device = [UIDevice currentDevice];
    NSDictionary *deviceData = @{
        @"uid": uid,
        @"clientOS": [NSString stringWithFormat:@"%@ %@", device.systemName, device.systemVersion],
        @"clientModel": device.model,
        @"clientOSVersion": device.systemVersion
    };

    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:deviceData options:0 error:&error];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    NSString *encryptedData = [AESHelper encryptData:jsonString withKey:self.aesKey];

    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@/check", self.baseURL]];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

    NSDictionary *body = @{
        @"token": self.packageToken,
        @"data": encryptedData
    };
    NSData *bodyData = [NSJSONSerialization dataWithJSONObject:body options:0 error:&error];
    [request setHTTPBody:bodyData];

    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            completion(nil, error);
            return;
        }

        NSError *jsonError;
        NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
        NSString *encryptedResponseData = jsonResponse[@"data"];

        NSString *decryptedData = [AESHelper decryptData:encryptedResponseData withKey:self.aesKey];
        if (decryptedData) {
            NSData *decryptedJsonData = [decryptedData dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *result = [NSJSONSerialization JSONObjectWithData:decryptedJsonData options:0 error:nil];
            completion(result, nil);
        } else {
            completion(nil, [NSError errorWithDomain:@"DecryptionError" code:1 userInfo:nil]);
        }
    }];
    [task resume];
}

- (void)loginWithUID:(NSString *)uid key:(NSString *)key completion:(void (^)(NSDictionary *result, NSError *error))completion {
    UIDevice *device = [UIDevice currentDevice];
    NSDictionary *loginData = @{
        @"uid": uid,
        @"key": key,
        @"clientOS": [NSString stringWithFormat:@"%@ %@", device.systemName, device.systemVersion],
        @"clientModel": device.model,
        @"clientOSVersion": device.systemVersion
    };

    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:loginData options:0 error:&error];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    NSString *encryptedData = [AESHelper encryptData:jsonString withKey:self.aesKey];

    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@/login", self.baseURL]];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

    NSDictionary *body = @{
        @"token": self.packageToken,
        @"data": encryptedData
    };
    NSData *bodyData = [NSJSONSerialization dataWithJSONObject:body options:0 error:&error];
    [request setHTTPBody:bodyData];

    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            completion(nil, error);
            return;
        }

        NSError *jsonError;
        NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
        NSString *encryptedResponseData = jsonResponse[@"data"];

        NSString *decryptedData = [AESHelper decryptData:encryptedResponseData withKey:self.aesKey];
        if (decryptedData) {
            NSData *decryptedJsonData = [decryptedData dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *result = [NSJSONSerialization JSONObjectWithData:decryptedJsonData options:0 error:nil];
            completion(result, nil);
        } else {
            completion(nil, [NSError errorWithDomain:@"DecryptionError" code:1 userInfo:nil]);
        }
    }];
    [task resume];
}

@end
```

## Android (Java)

### AES Encryption Helper

```java
import android.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AESHelper {
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/ECB/PKCS5Padding";

    public static String encrypt(String data, String key) {
        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.encodeToString(encryptedBytes, Base64.DEFAULT);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String decrypt(String encryptedData, String key) {
        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            byte[] decryptedBytes = cipher.doFinal(Base64.decode(encryptedData, Base64.DEFAULT));
            return new String(decryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### API Client

```java
import okhttp3.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class APIClient {
    private static final String BASE_URL = "https://api.authtool.app/api/public/v1/client";
    private static final String PACKAGE_TOKEN = "your_package_token_here";
    private static final String AES_KEY = "your_aes_key_here";

    private OkHttpClient client;
    private Gson gson;

    public APIClient() {
        this.client = new OkHttpClient();
        this.gson = new Gson();
    }

    public void checkPackage(APICallback<PackageInfo> callback) {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("token", PACKAGE_TOKEN);

        String json = gson.toJson(requestBody);
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(BASE_URL + "/package")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callback.onError(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    String responseBody = response.body().string();
                    JsonObject jsonResponse = gson.fromJson(responseBody, JsonObject.class);
                    String encryptedData = jsonResponse.get("data").getAsString();

                    String decryptedData = AESHelper.decrypt(encryptedData, AES_KEY);
                    if (decryptedData != null) {
                        PackageInfo packageInfo = gson.fromJson(decryptedData, PackageInfo.class);
                        callback.onSuccess(packageInfo);
                    } else {
                        callback.onError(new Exception("Decryption failed"));
                    }
                } catch (Exception e) {
                    callback.onError(e);
                }
            }
        });
    }

    public void checkDevice(String uid, APICallback<DeviceInfo> callback) {
        DeviceData deviceData = new DeviceData();
        deviceData.uid = uid;
        deviceData.clientOS = "Android " + android.os.Build.VERSION.RELEASE;
        deviceData.clientModel = android.os.Build.MODEL;
        deviceData.clientOSVersion = android.os.Build.VERSION.RELEASE;

        String jsonString = gson.toJson(deviceData);
        String encryptedData = AESHelper.encrypt(jsonString, AES_KEY);

        if (encryptedData == null) {
            callback.onError(new Exception("Encryption failed"));
            return;
        }

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("token", PACKAGE_TOKEN);
        requestBody.put("data", encryptedData);

        String json = gson.toJson(requestBody);
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(BASE_URL + "/check")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callback.onError(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    String responseBody = response.body().string();
                    JsonObject jsonResponse = gson.fromJson(responseBody, JsonObject.class);
                    String encryptedResponseData = jsonResponse.get("data").getAsString();

                    String decryptedData = AESHelper.decrypt(encryptedResponseData, AES_KEY);
                    if (decryptedData != null) {
                        DeviceInfo deviceInfo = gson.fromJson(decryptedData, DeviceInfo.class);
                        callback.onSuccess(deviceInfo);
                    } else {
                        callback.onError(new Exception("Decryption failed"));
                    }
                } catch (Exception e) {
                    callback.onError(e);
                }
            }
        });
    }

    public void login(String uid, String key, APICallback<LoginResult> callback) {
        LoginData loginData = new LoginData();
        loginData.uid = uid;
        loginData.key = key;
        loginData.clientOS = "Android " + android.os.Build.VERSION.RELEASE;
        loginData.clientModel = android.os.Build.MODEL;
        loginData.clientOSVersion = android.os.Build.VERSION.RELEASE;

        String jsonString = gson.toJson(loginData);
        String encryptedData = AESHelper.encrypt(jsonString, AES_KEY);

        if (encryptedData == null) {
            callback.onError(new Exception("Encryption failed"));
            return;
        }

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("token", PACKAGE_TOKEN);
        requestBody.put("data", encryptedData);

        String json = gson.toJson(requestBody);
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(BASE_URL + "/login")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callback.onError(e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    String responseBody = response.body().string();
                    JsonObject jsonResponse = gson.fromJson(responseBody, JsonObject.class);
                    String encryptedResponseData = jsonResponse.get("data").getAsString();

                    String decryptedData = AESHelper.decrypt(encryptedResponseData, AES_KEY);
                    if (decryptedData != null) {
                        LoginResult loginResult = gson.fromJson(decryptedData, LoginResult.class);
                        callback.onSuccess(loginResult);
                    } else {
                        callback.onError(new Exception("Decryption failed"));
                    }
                } catch (Exception e) {
                    callback.onError(e);
                }
            }
        });
    }
}
```

### Data Models and Interface

```java
// Callback interface
public interface APICallback<T> {
    void onSuccess(T result);
    void onError(Exception error);
}

// Data models
public class PackageInfo {
    public int status;
    public String name;
    public String version;
    public String updateNote;
    public String downloadUpdateLink;
    public String contactUrl;
    public boolean isNeedKey;
    public long requestTime;
}

public class DeviceData {
    public String uid;
    public String clientOS;
    public String clientModel;
    public String clientOSVersion;
}

public class DeviceInfo {
    public int status;
    public String expiredAt;
    public String key;
    public long requestTime;
    public boolean isExpired;
}

public class LoginData {
    public String uid;
    public String key;
    public String clientOS;
    public String clientModel;
    public String clientOSVersion;
}

public class LoginResult {
    public int status;
    public String expiredAt;
    public String key;
    public long requestTime;
    public String message;
}
```

## Implementation Notes

### Security Notes

1. **Don't hardcode credentials**: Use environment variables or secure storage
2. **Validate certificates**: Implement certificate pinning for production
3. **Error handling**: Don't expose sensitive information in error messages

### Device UID

- **iOS**: Use `identifierForVendor` or `advertisingIdentifier`
- **Android**: Use `Settings.Secure.ANDROID_ID` or create UUID stored in SharedPreferences

### Dependencies

#### iOS (Swift/Objective-C)

```swift
// No additional dependencies needed, use built-in frameworks
// Swift: CryptoKit, Foundation
// Objective-C: CommonCrypto, Foundation
```

#### Android (Java)

```gradle
// In build.gradle
implementation 'com.squareup.okhttp3:okhttp:4.9.3'
implementation 'com.google.code.gson:gson:2.8.9'
```

### Usage Examples

#### Swift

```swift
let apiClient = APIClient()

// Check package
Task {
    do {
        let packageInfo = try await apiClient.checkPackage()
        print("Package: \(packageInfo.name)")
    } catch {
        print("Error: \(error)")
    }
}
```

#### Objective-C

```objc
APIClient *apiClient = [[APIClient alloc] init];

[apiClient checkPackageWithCompletion:^(NSDictionary *result, NSError *error) {
    if (error) {
        NSLog(@"Error: %@", error.localizedDescription);
    } else {
        NSLog(@"Package: %@", result[@"name"]);
    }
}];
```

#### Java

```java
APIClient apiClient = new APIClient();

apiClient.checkPackage(new APICallback<PackageInfo>() {
    @Override
    public void onSuccess(PackageInfo result) {
        Log.d("API", "Package: " + result.name);
    }

    @Override
    public void onError(Exception error) {
        Log.e("API", "Error: " + error.getMessage());
    }
});
```
