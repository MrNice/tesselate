/* globals require, console */
require('./tesselate.js')({
  modules: {
  },
  development: true
}, run);

// Use function declaration because hoisting is good here
function run(){
  console.log('No modules, done');
}
