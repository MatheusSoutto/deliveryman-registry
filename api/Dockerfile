FROM node:alpine

WORKDIR /api

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]