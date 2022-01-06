
# Profiler

To solve the solutions analysis I've made a scrip in javascript which compares the time taked to execute an array with different ways, to run it you must install the npm dependencies:

```bash
  npm install
```

Then just run:
```bash
  node index
```

You will get a log in the console like this:
```bash
  [LOG-INFO] Profiler de _.each libreria lodash (microsegundos):
  158432
  [LOG-INFO] Profiler de map nativo (microsegundos):
  54842.1
  [LOG-INFO] Profiler de ForEach nativo (microsegundos):
  18261.6
  [LOG-INFO] Profiler de for incremental (microsegundos):
  84690
  [LOG-INFO] Profiler de for incremental (microsegundos):
  90828.5
```

## Analysis

The main requirement is determine which is the most optimum way to loop through an array.

If we see the output given by the profiler script we can say that ther optimum way is use the native javascript ForEach, but, in my opinion it's not so easy.

Talking only in the native ways give by javascript each one works for a different purpose.

### .map() 
This method allows us to iterate all the elements of an array.

### .forEach()
It is similar to .map() but this one doesn't return a new array.

### .reduce()
This method allows us to iterate all the elements but return just only one value. Could be the sum of the elements.

### .find()
Return the first element that matches with the condition.

### .filter()
Return all the elements that match with the condition.

----
*Etc.*

To sum up, each method works in an efficient way and each could be the best option in certain situation.

In this case as we don't need any value returned just looping, so we can choose the **JavaScript Native forEach** 'cause every script execution it has the minimun value of time execution.

