SITE_NAME=$1
PORT_NO=$2
SITES_AVAILABLE_FILE_CONTENT="server {
        listen 80;
        listen [::]:80;

        root /var/www/${SITE_NAME}.leckrapi.xyz/html;
        index index.html index.htm index.nginx-debian.html;

        server_name ${SITE_NAME}.leckrapi.xyz;

        location / {
                proxy_pass http://localhost:${PORT_NO};
                proxy_http_version 1.1;
                proxy_set_header Upgrade \$http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host \$host;
                proxy_cache_bypass \$http_upgrade;
        }
}";

cd /etc/nginx/sites-enabled
echo "$SITES_AVAILABLE_FILE_CONTENT" > "./${SITE_NAME}.leckrapi.xyz"
sudo nginx -t && sudo systemctl restart nginx || echo "Something went wrong"
