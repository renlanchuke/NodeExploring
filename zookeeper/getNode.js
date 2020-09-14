const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181');
const path = '/rpc';
async function listChildren(client, path) {
  const children = await client.getChildren(
    path,
    (event) => {
      console.log('Got watcher event: %s', event);
      listChildren(client, path);
    });
  console.log('Children of %s are: %j.', path, children);
}

client.once('connected', () => {
  console.log('Connected to ZooKeeper.');
  listChildren(client, path);
});

client.connect();
