<<<<<<< HEAD
FROM node:7.10.0-alpine
RUN mkdir -p /src
WORKDIR /src
COPY . /src
RUN npm i --prod
EXPOSE 5000
ENTRYPOINT node app.js
=======
#FROM alpine:edge
FROM mhart/alpine-node:latest
#RUN apk add --update nodejs
#RUN apk add --update mongodb
RUN mkdir -p /usr/src/proctest
WORKDIR /usr/src/proctest
COPY package.json /usr/src/proctest
RUN npm install
COPY . /usr/src/proctest
EXPOSE 5000
CMD ["node", "app.js"]
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2
