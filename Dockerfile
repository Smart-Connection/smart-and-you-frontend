FROM node:20 as build

ARG NUXT_PUBLIC_API_URL
ARG NUXT_PUBLIC_MAX_AUTH_COOKIE_AGE

WORKDIR /app

COPY . .

RUN npm i && \
    npm run generate

FROM nginx:1 as nginx

WORKDIR /app

COPY --from=build /app/.output/public .
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
