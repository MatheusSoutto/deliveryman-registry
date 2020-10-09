FROM node:alpine

WORKDIR /client

COPY . .

RUN CI=true
RUN HTTPS=true

RUN npm install
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]