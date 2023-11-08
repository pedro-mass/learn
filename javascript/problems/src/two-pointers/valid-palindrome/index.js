export { sanitize, isPalindrome };

/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  const maybePalindrome = sanitize(s);

  for (
    let front = 0, back = maybePalindrome.length - 1;
    front < back;
    front++, back--
  ) {
    if (maybePalindrome[front] !== maybePalindrome[back]) {
      return false;
    }
  }
  return true;
}

function sanitize(string) {
  return string.replaceAll(/[^a-z\d]/gi, "").toLowerCase();
}
