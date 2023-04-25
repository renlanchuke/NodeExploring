'use strict';

const { ClientEncryption } = require('mongodb-client-encryption');
const base64 = require('uuid-base64');
const fs = require('fs');
const Binary = require('mongodb').Binary;
const mongoose = require('mongoose');

run().catch((err) => console.log(err));

async function run() {
  /* Step 1: Connect to MongoDB using autoEncryption */

  // Create a very basic key. You're responsible for making
  // your key secure, don't use this in prod :)
  const arr = [];
  for (let i = 0; i < 96; ++i) {
    arr.push(i);
  }
  const key = Buffer.from(arr);

  const keyVaultNamespace = 'encryption.__keyVault';
  const kmsProviders = { local: { key: fs.readFileSync('./master-key.txt') } };
  let conn = await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Configure auto encryption
    autoEncryption: {
      keyVaultNamespace,
      kmsProviders,
      schemaMap: {
        'test.tests': {
          bsonType: 'object',
          encryptMetadata: {
            keyId: [new Binary(Buffer.from('yRHWul1QTLCH5h8T6ulN9w==', 'base64'), 4)],
          },
          properties: {
            insurance: {
              bsonType: 'object',
              properties: {
                policyNumber: {
                  encrypt: {
                    bsonType: 'int',
                    algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                  },
                },
              },
            },
            medicalRecords: {
              encrypt: {
                bsonType: 'array',
                algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
              },
            },
            bloodType: {
              encrypt: {
                bsonType: 'string',
                algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
              },
            },
            ssn: {
              encrypt: {
                bsonType: 'int',
                algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
              },
            },
          },
        },
      }
    }
  });

  /* Step 2: create a key and configure encryption using JSONschema */

  // Currently, mongodb-client-encryption exports a constructor
  // that takes an instance of the mongodb module as a parameter
  //   const encryption = new ClientEncryption(mongoose.connection.client, {
  //     keyVaultNamespace,
  //     kmsProviders,
  //   });

  //   const _key = await encryption.createDataKey('local');

  // CSFLE is defined through JSON schema. Easiest way to set
  // a JSON schema on your collection is via `createCollection()`
//   await mongoose.connection.dropCollection('tests').catch(() => {});
//   await mongoose.connection.createCollection('tests', {
//     validator: {
//       $jsonSchema: {
//         bsonType: 'object',
//         encryptMetadata: {
//           keyId: [new Binary(Buffer.from('yRHWul1QTLCH5h8T6ulN9w==', 'base64'), 4)],
//         },
//         properties: {
//           // Automatically encrypt the 'name' property
//           name: {
//             encrypt: {
//               bsonType: 'string',
//               algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic' }
//           }
//         }
//       }
//     }
//   });

  /* Step 3: Create a Mongoose model that uses the encrypted collection and see encryption in action */

  // 'super secret' will be stored as 'BinData' in the database,
  // if you query using the `mongo` shell.
  const Model = conn.model('Test', mongoose.Schema({ bloodType: String, name: String, first: String }));
  await Model.create({ bloodType: 'super secret', first: 'asdas' });
  const data = await Model.findOne({ first: 'asdas' });
  console.log(data);
}
