const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181');
const path = '/test/node1';
client.once('connected', async function() {
  await client.create(path);
  console.log('Node: %s is successfully created.', path);
  await client.close();
});

client.connect();
