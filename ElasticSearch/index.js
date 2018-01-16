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

var agg = {
    'assets_dst': {
      terms: {
        "script": "doc['NTOPNG_INSTANCE_NAME.raw'].value + '|' + doc['INTERFACE.raw'].value + '|' + doc['IPV4_DST_ADDR'].value + '|' + doc['OUT_DST_MAC.raw'].value",
        //"script": "doc['NTOPNG_INSTANCE_NAME.raw'].value",
        size: 0
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
            "sort": [{ "OUT_DST_OS.raw": { "order": "desc", "missing": "_last" } }]
          }
        }
      }

    },
    'assets_src': {
      terms: {
        "script": "doc['NTOPNG_INSTANCE_NAME.raw'].value + '|' + doc['INTERFACE.raw'].value + '|' + doc['IPV4_SRC_ADDR'].value + '|' + doc['IN_SRC_MAC.raw'].value",
        //"script": "doc['NTOPNG_INSTANCE_NAME.raw'].value",
        size: 0
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
        query: {
            match: {
                "OUT_DST_OS": 'ubuntu'
            }
        },
        "aggs": agg
        
    }

}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});