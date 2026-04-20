#!/bin/sh
PORT="${PORT:-80}"
BACKEND_URL="${BACKEND_URL:-http://backend:3001}"

sed -i "s|NGINX_PORT|$PORT|g" /etc/nginx/conf.d/default.conf
sed -i "s|NGINX_BACKEND_URL|$BACKEND_URL|g" /etc/nginx/conf.d/default.conf

echo "Starting nginx on port $PORT proxying to $BACKEND_URL"
exec nginx -g 'daemon off;'
