/* globals require, console */
var otherDependency = 1;
require('./tesselate.js')({
  modules: {
    A: ['accel-mma84', 'accel'],
    B: ['ble-ble113a', 'ble']
  },
  development: true
}, function(tessel, m) {
  // You have access to all your other dependencies :D
  console.log(otherDependency);

  m.accel.on('data', function(data) {
    console.log(data);
  });
});
