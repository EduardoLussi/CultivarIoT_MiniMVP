FROM node:latest
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install -D react-scripts
RUN npm install --legacy-peer-deps
CMD ["npm", "run", "start"]
