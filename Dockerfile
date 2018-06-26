FROM node:latest

RUN mkdir /usr/src/hwh-bot
WORKDIR /usr/src/hwh-bot

COPY package.json /usr/src/hwh-bot
RUN npm install
RUN npm install -g pm2

COPY . /usr/src/hwh-bot

CMD ["npm", "run", "production"]