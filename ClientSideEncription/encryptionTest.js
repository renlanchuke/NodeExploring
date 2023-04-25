'use strict';

const { MongoClient, Binary } = require('mongodb');
const connectionString = 'mongodb://localhost:27017/';
const keyVaultDb = 'encryption';
const keyVaultCollection = '__keyVault';
// use the base64 data key id returned by createKey() in the prior step
const base64KeyId = 'yRHWul1QTLCH5h8T6ulN9w==';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function main() {
  try {
    await client.connect();
    const keyDB = client.db(keyVaultDb);
    const keyColl = keyDB.collection(keyVaultCollection);
    const query = {
      _id: new Binary(Buffer.from(base64KeyId, 'base64'), 4),
    };
    const dataKey = await keyColl.findOne(query);
    console.log(dataKey);
  } finally {
    await client.close();
  }
}
main();
