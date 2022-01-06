const microprofiler = require('microprofiler');
const lodash = require('lodash')

var arrayData = new Array(10000000);

//.each Libreria lodash
var cont = 0;
var startLodash = microprofiler.start();
lodash.each(arrayData, function(value) {
    cont = cont + value;
  });
var elapsedLodash = microprofiler.measureFrom(startLodash);

console.log('[LOG-INFO] Profiler de _.each libreria lodash (microsegundos):');
console.log(elapsedLodash);

// map nativo
cont = 0;
var startMap = microprofiler.start();
arrayData.map((value)=>{
    cont = cont + value;
})
var elapsedMap = microprofiler.measureFrom(startMap);

console.log('[LOG-INFO] Profiler de map nativo (microsegundos):');
console.log(elapsedMap);


// for each nativo
cont = 0;
var startForEach = microprofiler.start();
arrayData.forEach((value)=>{
    cont = cont + value;
})
var elapsedForEach = microprofiler.measureFrom(startForEach);

console.log('[LOG-INFO] Profiler de ForEach nativo (microsegundos):');
console.log(elapsedForEach);

// for incremento ++
cont = 0;
var startForIncr = microprofiler.start();
for (var n = 0; n < arrayData.length; n++) {
    cont = cont + arrayData[n];
}
var elapsedForIncr = microprofiler.measureFrom(startForIncr);

console.log('[LOG-INFO] Profiler de for incremental (microsegundos):');
console.log(elapsedForIncr);

// for decremento --
cont = 0;
var startForIncr = microprofiler.start();
for (var n = arrayData.length; n > 0 && n <= arrayData.length; n--) {
    cont = cont + arrayData[n];
}
var elapsedForIncr = microprofiler.measureFrom(startForIncr);

console.log('[LOG-INFO] Profiler de for incremental (microsegundos):');
console.log(elapsedForIncr);