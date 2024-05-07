FROM node:18-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --save

COPY --chown=node:node . .

EXPOSE 5500

CMD [ "npm", "start" ]