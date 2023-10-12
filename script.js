// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


function generatePassword() {
  let password = '';
  // let length = window.prompt("How long should the password be? (minimum: 8, max: 128)");
  // does the same thing as the line above but is leanient with user input poping back up if an invalid input is input whole still letting the user cancel out of the prompts
  let abort = false;
  let failed = false;
  let length;
  while (!(abort || 8 <= parseInt(length) && parseInt(length) <= 128)) {
    let prompt = "How long should the password be? (minimum: 8, max: 128)";
    if (failed) {
      prompt += "\nPress Cancel to Cancel password creation";
    }
    length = window.prompt(prompt,'12');
    if (length == null) {
      abort = true;
    }
    failed = true;
  }
  failed = false;
  let characterTypes = [false, false, false, false];

  while (!(abort ||characterTypes.includes(true))) {
    let prompt = "What character types would you like to include (lowercase, uppercase, numeric, special characters)";
    if (failed) {
      prompt += "\nPress Cancel to Cancel password creation";
    }
    let input = window.prompt(prompt);
    if (input == null) {
      abort = true;
    } else { 
      characterTypes = parseCharacterTypes(input);
    }
    failed = true;
  }

  let availableCharacters = "";
  const characters = ["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ","0123456789","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"];
  for (let i = 0; i < 4; i++) {
    if (characterTypes[i]) {
      availableCharacters += characters[i];
    }
  }

  for (let i = 0; i < length; i++) {
    password += availableCharacters[Math.floor(Math.random()*availableCharacters.length)];
  }

  if (abort) {
    return "User canceled password creation";
  } else if (password == null) {
    return "password was unable to be generated";
  } else {
    return password;
  }
}

function parseCharacterTypes(temp) {
  // because I dont know how people will input their selection into the box I opted to parse it as best I can and last resorting to asking indevidualy
  let input = temp.toLowerCase();
  let characterTypes = [false,false,false,false];
  // lower, upper, numbers, special
  const names = [["lowercase","lower","low","undercase","under"], ["uppercase","upper","up","capital"], ["numeric","number","nums","num"], ["specialcharacters","special","specials"]];
  for (i in characterTypes) {
    for (j of names[i]) {
      if (input.includes(j)) {
        characterTypes[i] = true;
      }
    }
  }
  if (input.length == 4 && input.includes('y')) {
    for (i in input) {
      if (input[i] == 'y') {
        characterTypes[i] = true;
      }
    }
  }
  if (input.length <= 4) {
    const posible = 'luns'; 
    for (i in characterTypes) {
      if (input.includes(posible[i])) {
        characterTypes[i] = true;
      }
    }
  }

  if (!characterTypes.includes(true)) {
    let askAgain = confirm("We weren't able to figure out what you meant\nTo try again press ok\nTo be asked indevidualy press cancel");
    if (askAgain) {
      return [false,false,false,false];
    }
    characterTypes[0] = confirm("would you like to use lowercase characters?\nEX: abcd");
    characterTypes[1] = confirm("would you like to use uppercase characters?\nEX: ABCD");
    characterTypes[2] = confirm("would you like to use numeric characters?\nEX: 1234");
    characterTypes[3] = confirm("would you like to use special characters?\nEX: !+$?");
  }
  return characterTypes;
}