'use strict';
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const ClientEncryption = require('mongodb-client-encryption').ClientEncryption;

const path = './master-key.txt';
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
const connectionString = 'mongodb://localhost:27017';
const keyVaultNamespace = 'encryption.__keyVault';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function main() {
  try {
    await client.connect();
    const encryption = new ClientEncryption(client, {
      keyVaultNamespace,
      kmsProviders,
    });
    const key = await encryption.createDataKey('local');
    const base64DataKeyId = key.toString('base64');
    console.log('DataKeyId [base64]: ', base64DataKeyId);
  } finally {
    await client.close();
  }
}
main();
