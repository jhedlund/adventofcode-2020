// 8:20am

// expense report

export function expenseReport(inputArray) {
  inputArray.forEach(function(x, xindex, array) {
    inputArray.forEach(function(y, yindex, yarray) {
      if (xindex != yindex && xindex > yindex) {
        if (x + y == 2020) {
          console.log("Found at (" + xindex + ", " + yindex + ")");
          console.log(x * y);
        }
      }
    });
  });
}
