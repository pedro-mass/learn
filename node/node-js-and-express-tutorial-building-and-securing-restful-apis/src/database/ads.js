const { getDatabase } = require('./mongo')
// deprecate for ObjectId
// const { ObjectID } = require('mongodb')
const { ObjectId } = require('mongodb')

const collectionName = 'ads'

async function insertAd(ad) {
  const database = await getDatabase()
  const { insertedId } = await database.collection(collectionName).insertOne(ad)
  return insertedId
}

async function getAds() {
  const database = await getDatabase()
  return database.collection(collectionName).find({}).toArray()
}

async function deleteAd(id) {
  const database = await getDatabase()
  return database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  })
}

async function updateAd(id, ad) {
  const database = await getDatabase()
  delete ad._id
  return database.collection(collectionName).update(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...ad,
      },
    }
  )
}

module.exports = {
  insertAd,
  getAds,
  deleteAd,
  updateAd,
}
