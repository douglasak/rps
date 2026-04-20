FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY public/ ./public/
ARG BACKEND_URL=http://localhost:3001
RUN sed -i "s|const API = '/api'|const API = '${BACKEND_URL}/api'|g" ./public/index.html
CMD sh -c "serve -s public -l ${PORT:-3000}"
