require('dotenv').config()
const mongodb = require('./db/connect')
const express = require('express')
const cors = require('cors')
const contactsRouter = require('./routes/contacts')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const swaggerDevDocument = require('./swagger-dev.json')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/contacts', contactsRouter)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    process.env.NODE_ENV === 'dev' ? swaggerDevDocument : swaggerDocument
  )
)

mongodb.init((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})
