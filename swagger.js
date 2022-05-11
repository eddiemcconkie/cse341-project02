const swaggerAutogen = require('swagger-autogen')()

const createSwaggerFile = (env = 'prod') => {
  const host =
    env === 'prod' ? 'cse341-project02.herokuapp.com' : 'localhost:8080'
  const outputFile = env === 'prod' ? './swagger.json' : './swagger-dev.json'

  const doc = {
    info: {
      title: 'Contacts API',
      description: 'A basic CRUD API for managing contacts',
    },
    host,
    schemes: ['http', 'https'],
  }

  const endpointsFiles = ['./server.js']

  swaggerAutogen(outputFile, endpointsFiles, doc)
}

createSwaggerFile('dev')
createSwaggerFile()
