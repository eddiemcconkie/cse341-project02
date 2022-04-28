const mongodb = require('./db/connect')
const express = require('express')
const cors = require('cors')
const contactsRouter = require('./routes/contacts')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use('/contacts', contactsRouter)

mongodb.init((err, mongodb) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})
