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
