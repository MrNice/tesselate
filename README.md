tesselate
=========

Easy tessel module loading

tesselate is a dependency injector for tessel modules, abstracting away the need to nest multiple ‘ready’ listeners and callbacks within each other, or use promises or generators. In a way, it makes your modules tesselate wonderfully saving you the pain of boilerplate code. 

tesselate requires ‘tessel’ for you so you don’t have to. 

var tesselate = require(‘tesselate’); //loads tesselation module


tesselate({

  A: [‘accel-mma84’, ‘accel’], //loads accelerometer module, aliased as ‘accel’ on port A
  B: [‘ir-attx4’, ‘ir’] //loads IR module, aliased as ‘ir’ on port B

}, function(m, tessel){

//your code here

//refer to the IR module as m.ir or the accelerometer module as m.accel

});

