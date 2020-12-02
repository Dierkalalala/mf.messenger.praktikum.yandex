# PROD CONFIG

FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production # npm install

COPY . .

CMD [ "npm", "start" ]

# DEV CONFIG
FROM prod as dev

EXPOSE 5000 3000

ENV NODE_ENV=development

RUN npm install -g nodemon

RUN npm install --only=dev

CMD [ "npm", "run", "dev" ]
