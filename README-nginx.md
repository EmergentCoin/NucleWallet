# Nginx config for wallet

**Recommed Intranet IP**

```nginx
upstream node_server{
        server YOUR IP:8555; # your full node rpc.If you need to extend the node, you can add serve here.
}
server {
        listen 443;
        server_name your-domain-name;

        root /var/www/web; # web root
        index index.html index.htm;

        access_log /var/log/nginx/wallet.log main;
        error_log /var/log/nginx/wallet.error.log;
        ssl on;
        ssl_certificate  /etc/nginx/cert/wallet/xxx.pem; # your SSL
        ssl_certificate_key /etc/nginx/cert/wallet/xxx.key; # your SSL
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1.2;
        ssl_prefer_server_ciphers on;

        location / {
                try_files $uri $uri/ /index.html;
        }

        location ~ .*\.(html)$ { 
                add_header Cache-Control no-cache;
        }

        location /api/ {
                proxy_pass      http://YOUR IP:7021/api/;
        }
}
server {
        listen 8082;
        server_name localhost;
                location ^~/node/ {
                proxy_pass      https://node_server/;
                proxy_ssl_certificate   /root/data/mainnet/config/ssl/full_node/private_full_node.pem; # your full node SSL:~/./mainnet/config/ssl/full_node/
                proxy_ssl_certificate_key   /root/data//mainnet/config/ssl/full_node/private_full_node.key; # your full node SSL:~/./mainnet/config/ssl/full_node/
                proxy_ssl_session_reuse on;
                proxy_ssl_protocols TLSv1.2;
                proxy_ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
        }
}
```