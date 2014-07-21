tesselate
=========

### Easy tessel module loading

tesselate is a dependency injector for tessel modules, abstracting away the need to nest multiple ‘ready’ listeners and callbacks within each other, or use promises or generators (or even ~~shudders~~ to create multiple internal loaded flags). 

tesselate requires ‘tessel’ for you so you don’t have to. Your code exists as a callback to the the invocation of the tesselate function. 

### Features
* Ensures that all modules are loaded before your code runs
* Small library footprint size — only 11kb once packaged
* Has no external dependencies
* Development flag useful for debugging

### Quickstart

````
// Load and immediately run tesselate module
require(‘tesselate’)({
  modules: {
    A: [‘accel-mma84’, ‘accel’], // load accelerometer module, aliased as ‘accel’ on port A
    B: [‘ir-attx4’, ‘ir’] // load IR module, aliased as ‘ir’ on port B
  },
  development: true // enable development logging, useful for debugging
}, function(tessel, m){

  // returns tessel to you as 'tessel'

  // returns your modules to you as properties of object m
  // refer to the IR module as m.ir, or the accelerometer module as m.accel

  //your code here
});
````
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

### Getting fancy

Use hoisted functions to write even less and look posh, all while having your ready functions taken care of. 
````
require('tesselate')({
}, run);

function run(tessel, m){
  //your code here.
}
````

### Known possible improvements
* Use ES6 generators to remove the need for a callback
  * Tessel runtime does not have generators built in

### Refused 'improvements'
* Catching module loading errors inside the loader, passing to callback
  * You probably want to know if your module fails to load, and not hush it up.
