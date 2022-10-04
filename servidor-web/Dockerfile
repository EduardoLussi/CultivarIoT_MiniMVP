FROM node:current-alpine3.15

RUN addgroup app && adduser -S -G app app

WORKDIR /app

RUN chmod 777 /app

USER app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --legacy-peer-deps
RUN mkdir /app && chown app:app /app

COPY . ./

CMD npm start
