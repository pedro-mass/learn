const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

let database = null

async function startDatabase() {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryServer.create()
  const mongoDBURL = mongod.getUri()

  // const mongo = new MongoMemoryServer()
  // const mongoDBURL = await mongo.getConnectionString()

  const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
  })
  database = connection.db()
}

async function getDatabase() {
  if (!database) await startDatabase()
  return database
}

module.exports = {
  getDatabase,
  startDatabase,
}
