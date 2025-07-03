FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

