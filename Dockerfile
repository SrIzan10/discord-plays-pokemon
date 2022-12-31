FROM node:latest

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps make gcc g++ python

COPY package.json ./

RUN npm install

COPY . .

RUN tsc --build

CMD node dist/index.js