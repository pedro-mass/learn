export function charCount (str) {
  if (!isValidString(str)) return {}
  return str
    .toLowerCase()
    .split('')
    .filter(isAlphaNumeric)
    .reduce((map, letter) => {
      map[letter] = map.hasOwnProperty(letter) ? ++map[letter] : 1
      return map
    }, {})
}

function isValidString (str) {
  return str != null && typeof str === 'string'
}

function isAlphaNumeric (str) {
  return /^[a-zA-Z0-9]+$/g.test(str)
}
