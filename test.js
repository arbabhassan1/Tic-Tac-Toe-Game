function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueRandomCode(length) {
  let generatedCodes = new Set(); // Use a Set to store unique codes
  let code;

  do {
    code = "";
    for (let i = 0; i < length; i++) {
      let digit = generateRandomNumber(1, 9);
      code += digit;
    }
  } while (generatedCodes.has(code)); // Continue generating until a unique code is found

  generatedCodes.add(code);
  return code;
}

// Example: Generate a unique code of length 5
let uniqueRandomCode = generateUniqueRandomCode(1);
console.log(uniqueRandomCode);
