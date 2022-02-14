SITE_NAME=$1
[ -z "$SITE_NAME" ] && echo "Please provide a sitename" && read SITE_NAME

source ./env.sh

# - Add subdomain to CloudFlare leckrapi.xyz DNS that points to the server
curl -X POST "https://api.cloudflare.com/client/v4/zones/${API_DOMAIN_ZONE}/dns_records" -H "Content-Type:application/json" -H "Authorization: Bearer ${CLOUDFLARE_AUTH_TOKEN}" --data "{\"type\":\"A\",\"name\":\"${SITE_NAME}\",\"content\":\"${SSH_IP}\",\"ttl\":60,\"priority\":10,\"proxied\":true}"
