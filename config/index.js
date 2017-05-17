<<<<<<< HEAD
=======
const { MONGODB_CONNECTION, MONGODB_PORT_27017_TCP_PORT } = process.env
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2
module.exports = {
  jwt: {
    secret: 'jwt'
  },
  app: {
<<<<<<< HEAD
    port: 5000
  },
  db: {
    uri: process.env.URI || 'mongodb://localhost/proctest'
=======
    host: '0.0.0.0',
    port: 5000
  },
  db: {
    ip: '127.0.0.1',
    port: MONGODB_PORT_27017_TCP_PORT || '27017',
    uri: MONGODB_CONNECTION || '127.0.0.1:27017/proctest'
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2
  }
}
