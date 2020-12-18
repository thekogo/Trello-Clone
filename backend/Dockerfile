FROM node:12-buster-slim

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon

CMD ["nodemon", "."]

EXPOSE 5000