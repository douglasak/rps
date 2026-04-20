FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY public/ ./public/
CMD sh -c "serve -s public -l ${PORT:-3000}"
