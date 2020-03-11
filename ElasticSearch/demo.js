'use strict';
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function create() {
  await client.index({
    index: 'game-of-thrones',
    id: 1,
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  });
  await client.index({
    index: 'game-of-thrones',
    id: 2,
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  });
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  });
  // Here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' });
  // Let's search!
  const { body } = await client.count({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  });
  console.log(body);
}

async function bulk() {
  return client.bulk({
    body: [
      { index: { _index: 'test' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },
      { index: { _index: 'test' } },
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },
      { index: { _index: 'test', _id: 3 } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  });
}

async function getMapping() {
  const res = await client.indices.getMapping({
    index: 'test',
    // type: '_doc',
  });
  console.log(res.body);
}

async function putMapping() {
  return client.indices.putMapping({
    index: 'test',
    body: {
      properties: {
        'character': {
          'type': 'text',
          'index': 'analyzed'
        },
        'quote': {
          'type': 'text',
          'index': 'not_analyzed'
        },
      }
    }
  });
}
module.exports = {
  Create: create,
  Bulk: bulk,
  GetMapping: getMapping,
  PutMapping: putMapping
};
