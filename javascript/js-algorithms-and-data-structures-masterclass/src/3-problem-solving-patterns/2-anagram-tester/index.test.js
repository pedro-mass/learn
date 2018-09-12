import { loopTestCases } from '../../test-helpers'

import validAnagram from './index'

const testCases = [
  { input: ['', ''], output: true },
  { input: ['aaz', 'zza'], output: false },
  { input: ['anagram', 'nagaram'], output: true },
  { input: ['rat', 'car'], output: false },
  { input: ['awesome', 'awesom'], output: false },
  { input: ['qwerty', 'qeywrt'], output: true },
  { input: ['texttwisttime', 'timetwisttext'], output: true },
]

loopTestCases({ fnUnderTest: validAnagram, testCases })
