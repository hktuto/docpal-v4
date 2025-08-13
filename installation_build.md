```Nginx config
server {
    listen       8081;
    listen  [::]:8081;
    server_name  localhost;

    absolute_redirect off;
    access_log  /var/log/nginx/client/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/client;
        try_files $uri $uri/ @router;
        index  index.html index.htm;
        # error_page 405 =200 $request_uri;
        add_header Cross-Origin-Embedder-Policy: require-corp;
        add_header Cross-Origin-Opener-Policy: same-origin;
        add_header Cross-Origin-Resource-Policy: same-origin;
    }

    location @router {
        rewrite ^.*$ /index.html last;
    }

#     location /api {
#         add_header Access-Control-Allow-Origin * always;
#         add_header Access-Control-Allow-Headers * always;
#         add_header Access-Control-Allow-Methods * always;
#         if ($request_method = 'OPTIONS') {
# #            add_header Access-Control-Allow-Origin 'http://132.148.160.171:5001';
# #            add_header Access-Control-Allow-Headers '*';
# #            add_header Access-Control-Allow-Methods '*';
#             return 200;
#         }
#         proxy_pass http://132.148.160.171:8081/api;
#         proxy_method $request_method;
#         error_page 405 =200  $request_uri;
#     }


    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

```

# Tech Requirements

- Node js
- pnpm

## Installation

- Step 1 install node js via nvm
follow the instructions here: https://github.com/nvm-sh/nvm

- Step 2 install node version 20
```bash
nvm install 20
```

- Step 3 install pnpm
```bash
npm install -g pnpm
```

- Step 4 install dependencies
```bash
pnpm install
```

- Step 5 generate api 
update api setting.json locate in /libraries/api/src/setting.json
```json
{
  "CLIENT_URL": "https://sit-v2.wclsolution.com", // client url
  "ADMIN_URL": "https://admin.sit-v2.wclsolution.com", // admin url
  "PUBLIC_URL": "https://app2.wclsolution.com/public-api/report/v1", // public url
  "TEMPLATE_URL": "https://sit-v2.wclsolution.com/open-api/template" // document template url
}

```

then create api endpoint
``` bash
pnpm -F api generate

```
- Step 6 update env file
all env file locate in /env, you can duplicate the env file and update the value

Client env file
```json

CLIENTURL=https://demo.docpal.wclsolution.com
ADMINURL=https://admin.demo.docpal.wclsolution.com
PUBLIC_URL=https://demo.docpal.wclsolution.com/public-api/report/v1
VITE_DEV_SERVER_URL=http://localhost:3000
CLIENT_PROXY=https://demo.docpal.wclsolution.com/api
ADMIN_PROXY=https://admin.demo.docpal.wclsolution.com/api
DASHBOARD_PROXY=https://demo.docpal.wclsolution.com/public-api/report/v1/api
PROXY=https://demo.docpal.wclsolution.com/api
NOTIFICATION_PROXY=https://demo.docpal.wclsolution.com/notification/api
OPEN_PROXY=https://demo.docpal.wclsolution.com/open-api/template

pdfReaderUrl=https://demo.docpal.wclsolution.com/resources/pdfjs/web/viewer.html
API_ENDPOINT=https://demo.docpal.wclsolution.com/api
OFFICE_END_POINT=office.demo.docpal.wclsolution.com
UPLOAD_END_POINT=upload.demo.docpal.wclsolution.com
DOCPAL_END_POINT=demo.docpal.wclsolution.com
ADMIN_END_POINT=admin.demo.docpal.wclsolution.com
UPLOAD_PROXY=upload.demo.docpal.wclsolution.com

```

Admin env file
```json
CLIENTURL=https://demo.docpal.wclsolution.com
ADMINURL=https://admin.demo.docpal.wclsolution.com
PUBLIC_URL=https://demo.docpal.wclsolution.com/public-api/report/v1
VITE_DEV_SERVER_URL=http://localhost:3000
CLIENT_PROXY=https://demo.docpal.wclsolution.com/api
ADMIN_PROXY=https://admin.demo.docpal.wclsolution.com/api
DASHBOARD_PROXY=https://demo.docpal.wclsolution.com/public-api/report/v1/api
PROXY=https://admin.demo.docpal.wclsolution.com/api
NOTIFICATION_PROXY=https://demo.docpal.wclsolution.com/notification/api
OPEN_PROXY=https://demo.docpal.wclsolution.com/open-api/template

pdfReaderUrl=https://demo.docpal.wclsolution.com/resources/pdfjs/web/viewer.html
API_ENDPOINT=https://demo.docpal.wclsolution.com/api
OFFICE_END_POINT=office.demo.docpal.wclsolution.com
UPLOAD_END_POINT=upload.demo.docpal.wclsolution.com
DOCPAL_END_POINT=demo.docpal.wclsolution.com
ADMIN_END_POINT=admin.demo.docpal.wclsolution.com
UPLOAD_PROXY=upload.demo.docpal.wclsolution.com


```

- Step 7 build client, admin and public site
```bash
pnpm -F client build --dotenv ./env/[the env file name]
pnpm -F admin build --dotenv ./env/[the env file name]
pnpm -F public build --dotenv ./env/[the env file name]
```

The build result will be in
- client: /apps/client/.output/public
- admin: /apps/admin/.output/public
- public: /apps/public/.output/public


