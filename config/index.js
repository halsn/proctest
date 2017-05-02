const { MONGODB_CONNECTION, MONGODB_PORT_27017_TCP_PORT } = process.env
module.exports = {
  jwt: {
    secret: 'jwt'
  },
  app: {
    host: '0.0.0.0',
    port: 5000
  },
  db: {
    ip: '127.0.0.1',
    port: MONGODB_PORT_27017_TCP_PORT || '27017',
    uri: MONGODB_CONNECTION || '127.0.0.1:27017/proctest'
  }
}
