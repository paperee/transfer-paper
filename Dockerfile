FROM node:24-alpine

WORKDIR /app
COPY . .

RUN npm i

EXPOSE 5707

CMD ["node", "server.mjs"]