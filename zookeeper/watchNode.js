const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181');
const urlencode = require('urlencode');
const path = '/rpc/MedLinc.Like/addresses';
async function watchChildren(client, path) {
  client.watchChildren(path, (err, children) => {
    if (err) {
      this.emit('error', err);
      return;
    }
    console.log(children);
    const addressList = children.map((url) => urlencode.decode(url));
    console.log(path, addressList);
  });
}

client.once('connected', () => {
  console.log('Connected to ZooKeeper.');
  watchChildren(client, path);
});


client.connect();
