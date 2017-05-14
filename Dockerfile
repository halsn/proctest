#FROM alpine:edge
FROM mhart/alpine-node:latest
#RUN apk add --update nodejs
#RUN apk add --update mongodb
RUN mkdir -p /src
WORKDIR /src
COPY . /src
RUN npm install
EXPOSE 5000
CMD ["node", "app.js"]
