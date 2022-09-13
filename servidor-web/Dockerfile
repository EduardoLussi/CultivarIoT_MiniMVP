FROM node:latest
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm uninstall react-scripts
RUN npm install -D react-scripts
RUN npm install
COPY . ./
CMD ["npm", "start"]
