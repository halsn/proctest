const path = require('path')
const Agenda = require('agenda')

const config = require(path.resolve('./config'))
<<<<<<< HEAD
const agendaURI = config.db.uri
=======
const agendaURI = `${config.db.ip}:${config.db.port}/agenda`
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2

const agenda = new Agenda({ db: { address: agendaURI } })

agenda.on('ready', () => {
  agenda.start()
})

<<<<<<< HEAD
agenda.on('error', (err) => {
  console.log(err)
})

=======
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2
module.exports = (uuid) => {
  agenda.jobs({ name: 'testExpire' }, (err, jobs) => {
    if (err) console.log(err)
    const job = jobs.find(job => job.attrs.data.uuid === uuid)
<<<<<<< HEAD
    if (!job) return
=======
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2
    job.remove(err => {
      if (err) console.log(err)
    })
  })
}
