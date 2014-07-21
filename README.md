tesselate
=========

### Easy tessel module loading

tesselate is a dependency injector for tessel modules, abstracting away the need to nest multiple ‘ready’ listeners and callbacks within each other, or use promises or generators (or multiple, internal loaded flags). 

tesselate requires ‘tessel’ for you so you don’t have to. Your code exists as a callback to the the invocation of the tesselate function. Obviously, you must have globally npm installed tessel. 

### Features
* Ensures that all modules are loaded before your code runs
* Small library footprint size — only 11kb once packaged
* Shortcut sytax allows you to just list the modules you want in an array
* Has no external dependencies
* Development flag useful for debugging

### Quickstart
Require tesselate and invoke it, passing in a config object and your code, as a callback. 

````
// Load and immediately run tesselate module
require(‘tesselate’)({
  modules: {
    A: [‘accel-mma84’, ‘accel’], // load accelerometer module, aliased as ‘accel’ on port A
    B: [‘ir-attx4’, ‘ir’]        // load IR module, aliased as ‘ir’ on port B
  },
  development: true              // enable development logging, useful for debugging
}, function(tessel, m){

  // returns tessel to you as 'tessel'

  // returns your modules to you as properties of object m
  // refer to the IR module as m.ir, or the accelerometer module as m.accel

  //your code here
});
````
### Shortcut syntax
Instead of a config object, just pass in an array with the names of the npm modules of the modules you want, ordered by port. So for ports A, B, C and D, pass in [moduleA, moduleB, moduleC, moduleD], respectively. 

````
/* if accel and ble were plugged into ports A and B, respectively... */
require('tesselate')(['accel-mma84', 'ble-ble113a'], function(tessel, m) {
  //refer to each module by its prefix
  //i.e., refer to accel module as m.accel, or ble module as m.ble
  //your code here
});
````

#### Shortcut syntax supported modules
    module name | given alias
    ----------- | ------------
    ble-ble113a | ble
    accel-mma84 | accel
    ambient-attx4 | ambient
    audio-vs1053b | audio
    camera-vc0706 | camera
    climate-si7005 | climate
    climate-si7020 | climate
    gprs-sim900 | gprs
    gps-a2235h | gps
    ir-attx4 | infrared
    sdcard | sdcard
    rf-nrf24 | nrf
    relay-mono | relay
    rfid-pn532 | rfid
    servo-pca9685 | servo
### For newbies
* In your terminal / command line
  * Navigate to your project folder
  * Make sure you've installed tessel (sudo npm install -g tessel)
  * Run npm init (hit enter for all options if you're lazy)
  * npm install the tessel modules that your code uses (npm install --save <<your module>>)
  * npm install the tesselate module (npm install tesselate --save)
* In your main .js file
  * Require and use the tesselate module using the quickstart format above or getting-fancy format below
  * Hardware hack yourself to heaven :)


### Details

The tesselate module returns a function that should be invoked once, with the signature: tesselate(optionsObject, yourCode)

The optionsObject should be an object literal of the form:
````
{
  modules: {
    /* capitalised Name of port: ['name of required tessel npm module', 'name you'd like to use to refer to the module'] */
    A: [‘accel-mma84’, ‘accel’], 
    B: [‘ir-attx4’, ‘ir’],
  },
  
  development: true // Optional. True by default. Set to false to deactivate debugging logs

}
````
yourCode is an anonymous function that is passed m, an object with your modules loaded as properties with the names you gave them and the 'tessel' module, which was required for you. It is invoked for you as soon as all modules report that they're ready. If you require other modules before requiring and calling tesselate, they will be available to you in the callback function as well, as they are preserved in the callback's closure scope.

````
tesselate(optionsObject, function(tessel, m){
  //your code here, referring to tessel as tessel and your modules as m.yourGivenModuleName
});
````

### Known possible improvements
* Use ES6 generators to remove the need for a callback
  * Tessel runtime does not have generators built in

### Refused 'improvements'
* Catching module loading errors inside the loader, passing to callback
  * You probably want to know if your module fails to load, and not hush it up.
