FROM node:latest
WORKDIR /app

COPY package.json .
COPY . .
RUN npm install --legacy-peer-deps
CMD ["npm", "start"]