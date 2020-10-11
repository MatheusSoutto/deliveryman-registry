FROM node:alpine

WORKDIR /client/build

COPY ./client/build .

WORKDIR /api

COPY ./api .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]