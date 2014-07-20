/* globals require, console, module */
var tessel = require('tessel');

var tesselate = function(config, callback) {
  // TODO: add error checking for callback and config
  if (config.development === undefined) config.development = true;

  devLog('Tesselating...');

  if (Object.keys(config.modules).length) {
    var loadedModules = {};
    var readyModules = 0;
    var modules = null;
    var alias = null;

    for (var tesselPort in config.modules) {
      module = config.modules[tesselPort][0];
      alias = config.modules[tesselPort][1];
      devLog('Loading "' + module + '" as "' + alias + '"...');

      ++readyModules;

      loadedModules[alias] = require(module).use(tessel.port[tesselPort]);

      loadedModules[alias].on('ready', function() {
        devLog(capitalize(config.modules[tesselPort][1]) + ' is ready.');

        // If no more modules to load 
        if (!--readyModules) callback(tessel, loadedModules);
      });
    }
  } else {
    devLog('No modules to load, continuing...');
    callback(tessel, {});
  }

  // Purposeful hoisting
  function devLog(string) {
    // Double equals required for truthiness
    if (config.development == true) console.log(string);
  }
};

module.exports = tesselate;

// Purposeful hoisting
function capitalize(string) {
  var character = string.charCodeAt(0);
  return (character > 96 && character < 123) ?
    String.fromCharCode(character - 32) + string.slice(1) :
    string;
}
