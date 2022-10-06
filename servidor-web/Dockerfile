FROM node:current-alpine3.15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --legacy-peer-deps
RUN chown -R $(whoami) /app/node_modules/.cache

COPY . ./

CMD npm start
