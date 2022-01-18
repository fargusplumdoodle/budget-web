sed -i s~API_HOST_AND_PORT~$API_HOST~g /etc/nginx/nginx.conf

exec "$@"
