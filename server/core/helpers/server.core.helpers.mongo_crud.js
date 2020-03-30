const mongo_connector = require('../../utilities/server.utilities.mongo_connector')
const ObjectId = require('mongodb').ObjectId;
const db = {}

db.find_all = (collection_name, key_obj) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj
      const content = await db.collection(collection_name).find(key_obj).toArray();
      resolve(content)

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

db.insert = (collection_name, key_obj) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj
      const content = await db.collection(collection_name).insertOne(key_obj);
      resolve({ insertedCount: content.insertedCount, insertedId: content.insertedId })

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

db.find_by_id = (collection_name, key_obj) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj
      const content = await db.collection(collection_name).findOne(key_obj).toArray();
      resolve(content)

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

db.update_by_id = (collection_name, id,data) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj

      const content = await db.collection(collection_name).updateOne({ "_id" : ObjectId(id) },{ $set: data } );
      resolve(content.modifiedCount)

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

db.update_specific_key_by_id = (collection_name, id,data) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj

      const content = await db.collection(collection_name).updateOne({ "_id" : ObjectId(id) },{ $set: data },{ upsert: true } );
      resolve(content.modifiedCount)

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

db.delete_by_id = (collection_name, id) => {
  return new Promise(async (resolve, reject) => {
    let client = null;
    try {

      let { db, client: clientObj } = await mongo_connector.connectToServer();
      client = clientObj

      const content = await db.collection(collection_name).deleteOne({ "_id" : ObjectId(id) } );
      resolve(content.deletedCount)

    } catch (err) {
      reject(err)
    } finally {
      mongo_connector.closeConnection(client);
    }
  })
}

module.exports = db;