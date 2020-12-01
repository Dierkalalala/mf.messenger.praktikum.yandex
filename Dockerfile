# Базовый слой
FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production # npm install

COPY . .

CMD [ "npm", "start" ]

