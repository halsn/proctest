const path = require('path')
const Agenda = require('agenda')

const config = require(path.resolve('./config'))
const agendaURI = config.db.uri

const agenda = new Agenda({ db: { address: agendaURI } })

agenda.on('ready', () => {
  agenda.start()
})

agenda.on('error', (err) => {
  console.log(err)
})

module.exports = (uuid) => {
  agenda.jobs({ name: 'testExpire' }, (err, jobs) => {
    if (err) console.log(err)
    const job = jobs.find(job => job.attrs.data.uuid === uuid)
    if (!job) return
    job.remove(err => {
      if (err) console.log(err)
    })
  })
}
