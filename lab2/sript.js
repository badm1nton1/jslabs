function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log("Element " + i + ": value " + array[i]);
  }
}

function printArray1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(i + ": " + array[i]);
  }
}

printArray([1, 2, 3, 4, 5]);
printArray1([1, 2, 3, 4, 5]);


function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

forEach([1, 2, 3], function(element, index) {
  console.log("Element: " + element + ", Index: " + index);
});


function map(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

let squared = map([1, 2, 3], function(element) {
  return element * element;
});
console.log(squared);


function filter(array, callback) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

let evenNumbers = filter([1, 2, 3, 4, 5], function(element) {
  return element % 2 === 0;
});
console.log(evenNumbers);


function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

let firstEven = find([1, 2, 3, 4, 5], function(element) {
  return element % 2 === 0;
});
console.log(firstEven);


function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

let hasEven = some([1, 2, 3, 4, 5], function(element) {
  return element % 2 === 0;
});
console.log(hasEven);


function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

let allEven = every([2, 4, 6], function(element) {
  return element % 2 === 0;
});
console.log(allEven);


function reduce(array, callback, initialValue) {
  let acc;
  let start;

  if (initialValue === undefined) {
    acc = array[0];
    start = 1;
  } else {
    acc = initialValue;
    start = 0;
  }

  for (let i = start; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}

let sum = reduce([1, 2, 3, 4, 5], function(acc, element) {
  return acc + element;
}, 0);
console.log(sum);
