"use strict";

function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);

    while (result instanceof Function) {
      result = result();
    }

    return result;
  };
}

const isPalindrome = trampoline((str, thing = true) => {
  if (!thing) return false;
  if (!str || str.length < 2) return true;

  const first = str[0];
  const last = str[str.length - 1];
  return () => isPalindrome(str.slice(1, str.length - 1), first === last);
});

console.log(isPalindrome("") === true);
console.log(isPalindrome("a") === true);
console.log(isPalindrome("aa") === true);
console.log(isPalindrome("aba") === true);
console.log(isPalindrome("abba") === true);
console.log(isPalindrome("abccba") === true);

console.log(isPalindrome("ab") === false);
console.log(isPalindrome("abc") === false);
console.log(isPalindrome("abca") === false);
console.log(isPalindrome("abcdba") === false);
