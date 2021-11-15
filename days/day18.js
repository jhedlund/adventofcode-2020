/*
 * Day 18
 *
 */

import Day from "./day.js";

export default class Day18 extends Day {
  constructor() {
    super(
      18,
      [["1 + 2 * 3 + 4 * 5 + 6 "],
       ["1 + (2 * 3) + (4 * (5 + 6))"],
       ["2 * 3 + (4 * 5)"],
       ["5 + (8 * 3 + 9 + 3 * 4 * 3)"],
       ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"],
       ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"]],
      [[71, 51, 26, 437, 12240, 13632], [231, 51, 46, 1445, 669060, 23340]],
      [36382392389406,381107029777968]
    );
  }
  star1(inputArray) {
    //this.writeDebug("---");
    return [this.domaths(inputArray, true), ""];
  }
  star2(inputArray) {
    //this.dodebug = true;
    return [this.domaths(inputArray, false), ""];
  }

  domaths(input, useLTOR) {
    let total = 0;
    let self = this;
    input.forEach(function(val) {
      total += Number(self.domath(val, useLTOR));
    });
    return total;
  }

  domath(input, useLTOR) {
    input = this.removeparens(input, 0, useLTOR);
    return this.addmultiply(input, useLTOR);
  }

  removeparens(input, start, useLTOR) {
    input = input.trim();
    //this.writeDebug(input);
    let firstParen = input.indexOf("(", start);
    while(firstParen >= 0) {
      let secondParen = input.indexOf("(", firstParen + 1);
      let closeParen = input.indexOf(")", firstParen + 1);      
      if(closeParen >= 0 && (secondParen == -1 || closeParen < secondParen)) {
        //this.writeDebug("input: " + input + " (firstParen=" + firstParen + ", closeParen=" + closeParen + ")");
        let mathEval = this.addmultiply(input.substring(firstParen + 1, closeParen).trim(), useLTOR);
        // rebuild input with data to firstParen + mathEval + data after close paren
        let left = input.substring(0, firstParen).trim();
        let right = input.substring(closeParen + 1).trim();
        input = left + " " + mathEval + " " + right;
      } else if(secondParen >= 0) {
        input = this.removeparens(input, secondParen, useLTOR);
      }
      firstParen = input.indexOf("(", start);
    }
    return input;
  }

  addmultiply(input, useLTOR) {
  
    let left = 0;
    
    let inputs = input.trim().split(" ");
    
    let passes = 1;
    if(!useLTOR) passes = 2;

    let secondpass = [];

    for(let pass = 0; pass < passes; pass++) {

      let pluscount = 0;
      let multcount = 0;
      
      if(pass==1) {
        inputs = secondpass;
      }

      for(let i = 0; i<inputs.length; i++) {
        if(inputs[i] == "+") {
          pluscount++;
        }else if(inputs[i] == "*") {
          multcount++;
        }
      }
      this.writeDebug("input array = " + inputs.toString());
      let totcount = pluscount + multcount;
      
      left = Number(inputs[0]);
      let prevoper = "*";

      for(let operation = 0; operation < totcount; operation++) {
        
        this.writeDebug("[" + pass + "/" + passes + "] operation: " + operation + ", tot=" + totcount);  
        let oper = inputs[operation + 1 + operation];
        let right = Number(inputs[operation+ 2 + operation]);
        

        if(!useLTOR && pass == 0 && oper == "+" && prevoper == "*") {
          left = Number(inputs[operation + 0 + operation]);
        }
        prevoper = oper;
        if(useLTOR || pass == 1 || oper == "+" ) {
          this.writeDebug(left + " " + oper + " " + right);
          if(oper == "+") {
            left += right;
          } else if(oper == "*") {
            left *= right;
          }
          if(!useLTOR && pass == 0) {
            if(secondpass.length > 0) {
              secondpass.pop();
            }
            secondpass.push(left);
          }
        } else {
          // already have the left from above, unless we haven't seen an addition yet:
          if(secondpass.length == 0) {
            secondpass.push(inputs[operation + 0 + operation]); 
          }
          secondpass.push(oper);
          secondpass.push(right);
        }
      }
    }
    return left;
  }

}
