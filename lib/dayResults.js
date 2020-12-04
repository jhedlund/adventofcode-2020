/*
 *  Container for results
 *
 */

export default class dayResults {
  constructor(day) {
    this.day = day;
    this.results = [];
  }
  addResult(sampleNumber, star, isSuccess, answer, expected) {
    this.results.push(
      new dayResult(sampleNumber, star, isSuccess, answer, expected)
    );
  }
}

export class dayResult {
  constructor(sampleNumber, star, isSuccess, answer, expected) {
    if (sampleNumber > 0) {
      this.sampleNumber = sampleNumber;
    }
    this.star = star;
    this.success = isSuccess;
    this.answer = answer;
    this.expected = expected;
  }
}
