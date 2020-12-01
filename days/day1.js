// 8:20am

// expense report

export function expenseReport(inputArray, expectedResult, depth = 2) {
  let answer = sumArray([], 0, inputArray, depth);
  /* inputArray.forEach(function(x, xindex, array) {
    inputArray.forEach(function(y, yindex, yarray) {
      if (xindex != yindex && xindex > yindex) {
        if (Number(x) + Number(y) == 2020) {
          //console.log("Found at (" + xindex + ", " + yindex + ")");
          answer = Number(x) * Number(y);
        }
      }
    });
  }); */
  let status = "FAILURE (expected " + expectedResult + "): ";
  if (answer == expectedResult) {
    status = "SUCCESS: ";
  }
  console.log(status + answer);
}

function sumArray(startValues, startIx, inputArray, depth) {
  let answer = -1;
  inputArray.forEach(function(val, ix, arr) {
    if (ix >= startIx) {
      if (depth == 1) {
        let sumvalues =
          startValues.reduce(function(a, b) {
            return a + b;
          }) + Number(val);

        if (sumvalues == 2020) {
          answer =
            startValues.reduce(function(a, b) {
              return a * b;
            }) * Number(val);

          console.log("Values:", startValues.concat(Number(val)));

          return answer;
        }
      } else {
        // depth > 1

        let tmp = sumArray(
          startValues.concat(Number(val)),
          ix + 1,
          inputArray,
          depth - 1
        );
        if (tmp != -1) answer = tmp;
      }
    }
  });
  return answer;
}
