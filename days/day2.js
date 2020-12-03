/*
 * Day 2
 *
 * Passwords and Corporate Policy
 */

export function checkPasswordPolicy(inputArray, expectedCount) {
  let valid_passwords = 0;

  inputArray.forEach(function(value, index, array) {
    let line = value.split(":");
    let policy = line[0].split(" ");
    let policy_char = policy[1].trim();
    let policyminmax = policy[0].split("-");
    let policy_min = policyminmax[0];
    let policy_max = policyminmax[1];

    let password = line[1].trim();

    let char_found = password.match(new RegExp(policy_char, "g"));
    let char_count = 0;
    if (char_found !== null) char_count = char_found.length;

    if (char_count >= policy_min && char_count <= policy_max) {
      valid_passwords++;
    }
  });

  let status = "FAILURE (expected " + expectedCount + "): ";

  if (valid_passwords == expectedCount) {
    status = "SUCCESS: ";
  }

  console.log(status + valid_passwords);
}

function count_char(input, char) {}
