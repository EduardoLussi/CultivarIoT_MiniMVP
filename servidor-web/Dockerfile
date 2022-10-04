FROM node:current-alpine3.15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install -g eslint --unsafe-perm=true --allow-root
RUN npm install --legacy-peer-deps

COPY . ./

CMD npm start
