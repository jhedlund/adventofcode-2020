/*
 *  Container for results
 *
 */

export const StatusEnum = Object.freeze({
  failure: "failure",
  success: "success",
  notimplemented: "notimplemented",
  missinginputdata: "missinginputdata",
  missingexpectedvalue: "missingexpectedvalue",
  missingresult: "missingresult",
  wrongresulttype: "wrong result type"
});

export class dayResults {
  constructor(day) {
    this.day = day;
    this.results = [];
  }
  addResult(sampleNumber, star, status, answer, expected, extradata, timems) {
    this.results.push(
      new dayResult(
        sampleNumber,
        star,
        status,
        answer,
        expected,
        extradata,
        timems
      )
    );
  }
  status() {
    if(this.results.length == 0) {
      return StatusEnum.missingresult;
    } else {
      let retval = StatusEnum.success;
      this.results.every(function(result) {
        if(result.status != StatusEnum.success) {
          retval = result.status;
          return false;
        }
        return true;
      });
      return retval;
    }
  }
}

export class dayResult {
  constructor(sampleNumber, star, status, answer, expected, extradata, timems) {
    if (sampleNumber > 0) {
      this.sampleNumber = sampleNumber;
    }
    this.star = star;
    this.status = status;
    this.answer = answer;
    this.expected = expected;
    this.extradata = extradata;
    this.timems = timems;
  }
}
