var tessel = require('tessel');
var tesselate = function(obj, cb){

  console.log('tesselating');
  var results = {};
  var readyModules = 0;

  for (var tesselPort in obj) {
    var module = obj[tesselPort][0];
    var alias = obj[tesselPort][1];

    readyModules++;
    console.log('Loading \'' + module + '\' as \'' + alias + '\'');

    results[alias] = require(module).use(tessel.port[tesselPort]);

    results[alias].on('ready', function() {
      if(!--readyModules) {
        cb(results, tessel);
      }
    });
  }
};

tesselate.isReady = false;

var exports = module.exports = tesselate;