# Cross Domain Cookie

- **request.mode returns "cors" by default!!**, but it's also up to your browser, sometime it will not be cross as defualt.

- Make cookie communicate between http://127.0.0.1:3001 and http://127.0.0.1:3000.

```
Access-Control-Allow-Origin: http://127.0.0.1:3001
Access-Control-Allow-Credentials: true
```

- Note: You can't set "Access-Control-Allow-Origin: *", because the fetch function will not work correctly.
- If you set:

```
Access-Control-Allow-Origin: *            // 讓瀏覽器跨籲請求不會出現 cors domain error
                                          // (optional)要不拋錯還可以選擇用 request.mode = 'no-corse'
Access-Control-Allow-Credentials: true    // 讓瀏覽器可以讀取 preload body of response
```

cause:

```
Failed to load http://127.0.0.1:3000/setCookie: The value of the 'Access-Control-Allow-Origin' header
in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
Origin 'http://127.0.0.1:3001' is therefore not allowed access. The credentials mode of requests
initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```

# Access-Control-Allow-Credentials

- Access-Control-Allow-Credentials用于告知浏览器当withCredentials属性设置为true时，是否可以显示跨域请求返回的内容。简单请求时，浏览器会根据此响应头决定是否显示响应的内容。预先验证请求时，浏览器会根据此响应头决定在发送实际跨域请求时，是否携带认证信息。
- 但瀏覽器將會拒絕任何沒有 Access-Control-Allow-Credentials: true 標頭值的回應，並且不讓呼叫的網站內容存取該回應。
- **即瀏覽器無法讀取 preload body of response from server。(但是所有針對 Browser 的 setCookie 都還是會有作用！)**

# Access-Control-Allow-Origin

- Access-Control-Allow-Origin头中携带了服务器端验证后的允许的跨域请求域名，可以是一个具体的域名或是一个（表示任意域名）。简单请求时，浏览器会根据此响应头的内容决定是否给脚本返回相应内容，预先验证请求时，浏览器会根据此响应头决定是否发送实际的跨域请求。
- **若無設定瀏覽器 Js 將會拋出錯誤告知無法跨籲請求。(但是所有針對 Browser 的 setCookie 都還是會有作用！)**

# Comparison

- Legacy Browser

```
Access-Control-Allow-Origin: *
```

- Current Browser

```
# $SERVER_NAME_WHICH_SENT_REQUEST, ex: http://127.0.0.1:3001

Access-Control-Allow-Origin: $SERVER_NAME_WHICH_SENT_REQUEST
Access-Control-Allow-Credentials: true
```

# Request.mode

- 不影響發訴的 HTTP HEAD 但是會影響瀏覽器處理這個 Fetch Function 政策

- no-cors: 不論 targetURL 是不是 crossdomain 都會成功發送, 但是如果是 cors 將會產生 CORB 無法讀取 preload body, 但是 setCookie 會作用！

- cors: (預設模式)如果再 crossdomain 若伺服器無設定相關 Header(ex: Access-Control-Allow-???) 於發送後接受 Response 後將產生錯誤, 無法正確拿到結果！,但是 setCookie 會作用！

#### cors

- Default value for most browser, cause error when crossdomain, if server no set "Access-Control-Allow-Origin"

#### no-cors

- Sent request as no-cors mode even if target url is different domain, but it usually causes CORB
