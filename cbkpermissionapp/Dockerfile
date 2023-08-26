# Stage 1: Build the React app
FROM node:16-alpine3.16 AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile --production=true

COPY . .

# Build the app for production
RUN yarn run build

FROM nginx:alpine AS production

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
