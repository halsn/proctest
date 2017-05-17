module.exports = {
  jwt: {
    secret: 'jwt'
  },
  app: {
    port: 5000
  },
  db: {
    uri: process.env.URI || 'mongodb://localhost/proctest'
  }
}
