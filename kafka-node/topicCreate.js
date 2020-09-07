var kafka = require('kafka-node');
var client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

var topicsToCreate = [
  {
    topic: 'topic1',
    partitions: 1,
    replicationFactor: 2
  },
  {
    topic: 'topic2',
    partitions: 5,
    replicationFactor: 3,
    // Optional set of config entries
    configEntries: [
      {
        name: 'compression.type',
        value: 'gzip'
      },
      {
        name: 'min.compaction.lag.ms',
        value: '50'
      }
    ],
    // Optional explicit partition / replica assignment
    // When this property exists, partitions and replicationFactor properties are ignored
    replicaAssignment: [
      {
        partition: 0,
        replicas: [3, 4]
      },
      {
        partition: 1,
        replicas: [2, 1]
      }
    ]
  }];

client.createTopics(topicsToCreate, (error, result) => {
  // Result is an array of any errors if a given topic could not be created
  console.log(error || result);
});
