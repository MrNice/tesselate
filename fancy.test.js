/* globals require, console */
require('./tesselate.js')(['accel-mma84', 'ble-ble113a'], function(tessel, m) {
  m.accel.on('data', function(data) {
    console.log(data);
  });

  m.ble.on('disover', function(data) {
    console.log(data);
  });
});
