FROM node:18-slim

RUN mkdir -p /home/node/react_app/node_modules && chown -R node:node /home/node/react_app

WORKDIR /home/node/react_app

COPY public/ /react_app/public
COPY src/ /react_app/src
COPY package*.json ./

RUN npm install --save

COPY --chown=node:node . .

CMD ["npm", "start"]