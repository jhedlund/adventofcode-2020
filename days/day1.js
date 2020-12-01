// 8:20am

// expense report

export function expenseReport(inputArray, expectedResult) {
  let answer = 0;
  inputArray.forEach(function(x, xindex, array) {
    inputArray.forEach(function(y, yindex, yarray) {
      if (xindex != yindex && xindex > yindex) {
        if (Number(x) + Number(y) == 2020) {
          //console.log("Found at (" + xindex + ", " + yindex + ")");
          answer = Number(x) * Number(y);
        }
      }
    });
  });
  let status = "FAILURE (expected " + expectedResult + "): ";
  if (answer == expectedResult) {
    status = "SUCCESS: ";
  }
  console.log(status + answer);
}

function sumArray(startValue, startIx, inputArray, depth) {}
