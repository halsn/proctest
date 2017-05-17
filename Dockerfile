FROM node:7.10.0-alpine
RUN mkdir -p /src
WORKDIR /src
COPY . /src
RUN npm i --prod
EXPOSE 5000
ENTRYPOINT node app.js
