export default function validAnagram (str1, str2) {
  if (!areArgumentsValid(str1, str2)) {
    return false
  }
  const getFrequencies = str =>
    str.split('').reduce((map, char) => {
      map[char] = ++map[char] || 1
      return map
    }, {})

  const frequencies1 = getFrequencies(str1)
  const frequencies2 = getFrequencies(str2)

  for (const char in frequencies1) {
    if (frequencies1[char] !== frequencies2[char]) {
      return false
    }
  }
  return true
}

function areArgumentsValid (str1, str2) {
  return str1 != null && str2 != null && str1.length === str2.length
}
