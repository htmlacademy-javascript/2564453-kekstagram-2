/*function checkStringLength(string = '', maxSymbols = 1) {
  return string.length <= maxSymbols;
}
checkStringLength('проверяемая строка', 20);

function isPalindrome(string = ''){
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--){
    reversedString += string[i];
  }
  return string === reversedString;
}
isPalindrome('топот');

function extractNumbers(string){
  let result = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  return result === '' ? NaN : Number(result);
}
extractNumbers('1 кефир, 0.5 батона');*/
