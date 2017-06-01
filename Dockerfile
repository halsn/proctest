FROM node:7.10.0-alpine
RUN mkdir -p /src
WORKDIR /src
COPY . /src
RUN cp -r -f /usr/share/zoneinfo/Hongkong /etc/localtime
RUN npm i --prod
EXPOSE 5000
ENTRYPOINT node app.js
