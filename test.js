require('./tesselate.js')({
  modules: {
    A: ['accel-mma84', 'accel'],
    B: ['ble-ble113a', 'ble']
  },
  development: true
}, function(tessel, m) {
  m.accel.on('data', function(data) {
    console.log(data);
  })
});
