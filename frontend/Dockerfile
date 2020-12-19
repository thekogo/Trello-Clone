FROM node:12
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
ADD . ./src
WORKDIR /src
RUN yarn global add pm2
RUN yarn build
CMD ["pm2-runtime", "ecosystem.config.js"]
EXPOSE 3000