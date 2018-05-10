var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'debug'
});


// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
// }, function (error) {
//     if (error) {
//         console.trace('elasticsearch cluster is down!');
//     } else {
//         console.log('All is well');
//     }
// });


// client.search({
//     q: 'ubuntu'
//   }).then(function (body) {
//     var hits = body.hits.hits;
//   }, function (error) {
//     console.trace(error.message);
//   });

var query =
  {
    "bool":
      {
        "must": [],
        "must_not": [{ "range": { "IPV4_DST_ADDR": { "gte": "0.0.0.0", "lt": "0.255.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "0.0.0.0", "lt": "0.255.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "100.64.0.0", "lt": "100.127.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "100.64.0.0", "lt": "100.127.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "127.0.0.0", "lt": "127.255.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "127.0.0.0", "lt": "127.255.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "169.254.0.0", "lt": "169.254.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "169.254.0.0", "lt": "169.254.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "192.0.0.0", "lt": "192.0.0.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "192.0.0.0", "lt": "192.0.0.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "192.0.2.0", "lt": "192.0.2.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "192.0.2.0", "lt": "192.0.2.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "192.88.99.0", "lt": "192.88.99.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "192.88.99.0", "lt": "192.88.99.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "198.18.0.0", "lt": "198.19.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "198.18.0.0", "lt": "198.19.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "198.51.100.0", "lt": "98.51.100.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "198.51.100.0", "lt": "98.51.100.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "203.0.113.0", "lt": "203.0.113.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "203.0.113.0", "lt": "203.0.113.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "224.0.0.0", "lt": "239.255.255.255" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "224.0.0.0", "lt": "239.255.255.255" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "240.0.0.0", "lt": "255.255.255.254" } } },
        { "range": { "IPV4_SRC_ADDR": { "gte": "240.0.0.0", "lt": "255.255.255.254" } } },
        { "range": { "IPV4_DST_ADDR": { "gte": "255.255.255.255", "lt": "255.255.255.255" } } },
        { "term": { "IPV4_SRC_ADDR": "255.255.255.255" } },
        { "term": { "IPV4_DST_ADDR": "255.255.255.255" } },
        { "term": { "IPV4_SRC_ADDR": "0.0.0.0" } },
        { "term": { "IPV4_DST_ADDR": "0.0.0.0" } }],
        "should": []
      }
  }

var agg = {
  'assets_dst': {
    terms: {
      "script": "doc['NTOPNG_INSTANCE_NAME.raw'].value + '|' + doc['INTERFACE.raw'].value + '|' + doc['IPV4_DST_ADDR.raw'].value + '|' + doc['OUT_DST_MAC.raw'].value"
    },
    "aggs": {
      "first_seen": {
        "top_hits": {
          "size": 1,
          "sort": [{ "@timestamp": { "order": "asc" } }]
        }
      },
      "os": {
        "top_hits": {
          "size": 1,
          "sort": [{ "OUT_DST_OS.raw": { "order": "desc" } }]
        }
      }
    }

  },
  'assets_src': {
    terms: {
      "script": "doc['NTOPNG_INSTANCE_NAME.raw'].value + '|' + doc['INTERFACE.raw'].value + '|' + doc['IPV4_SRC_ADDR.raw'].value + '|' + doc['IN_SRC_MAC.raw'].value"
    },
    "aggs": {
      "first_seen": {
        "top_hits": {
          "size": 1,
          "sort": [{ "@timestamp": { "order": "asc" } }]
        }
      },
      "os": {
        "top_hits": {
          "size": 1,
          "sort": [{ "IN_SRC_OS.raw": { "order": "desc" } }]
        }
      }
    }
  }
};



client.search({
  index: 'ntopng-*',
  type: 'flows',
  body: {
    "query":{
      "match_all":{}
    },
    "aggs": agg
  }

}).then(function (resp) {
  console.log(JSON.stringify(resp.hits.hits));
  var hits = resp.hits.hits;
  console.log("\n\n")
  console.log(JSON.stringify(resp));
}, function (err) {
  console.trace(err.message);
});