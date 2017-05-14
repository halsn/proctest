const path = require('path')
const Agenda = require('agenda')

const checkAnswer = require(path.resolve('./lib/jobs/checkAnswer.js'))
const checkTest = require(path.resolve('./lib/jobs/checkTest.js'))
const config = require(path.resolve('./config'))
const agendaURI = config.db.uri

const agenda = new Agenda({ db: { address: agendaURI } })

agenda.on('ready', () => {
  agenda.define('answerExpire', (job, done) => {
    const { data } = job.attrs
    checkAnswer(data)
      .then(() => done())
      .catch(err => {
        console.log(err)
      })
  })
  agenda.define('testExpire', (job, done) => {
    const { data } = job.attrs
    checkTest(data)
      .then(() => done())
      .catch(err => {
        console.log(err)
      })
  })
  agenda.start()
})

module.exports = agenda
