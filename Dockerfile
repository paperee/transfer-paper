FROM node:24-alpine

WORKDIR /app
COPY . .

RUN npm i

EXPOSE 5708

CMD ["node", "server.mjs"]