var modules = require('./tesselate.js')({
  A: ['accel-mma84', 'accel'],
  B: ['ble-ble113a', 'ble']
}, function(m){

  // All your code here
  console.log('everything is ready');

  m.accel.on('data', function(data) {
    console.log(data);
  });
});

