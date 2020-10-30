import { loopTestCases } from '../test-helpers'

import * as testFns from './index'

const testCases = [
  {
    // only: true,
    name: 'sampleTree - 1 nesting',
    input: [
      {
        a: 1,
        b: 1,
        c: {
          c1: 1,
          c2: 1,
        },
      },
    ],
    output: true,
  },
  {
    // only: true,
    name: 'sampleTree - 1 nesting (false)',
    input: [
      {
        a: 1,
        b: 1,
        c: {
          c1: 2,
          c2: 1,
        },
      },
    ],
    output: false,
  },
  {
    // skip: true,
    name: 'strings vs numbers',
    input: [
      {
        a: '1',
        b: 1,
        c: {
          c1: '1',
          c2: 1,
        },
      },
    ],
    output: false,
  },
  {
    // skip: true,
    name: 'nested not equal to outer',
    input: [
      {
        a: 1,
        b: 1,
        c: {
          c1: 2,
          c2: 2,
        },
      },
    ],
    output: false,
  },
  {
    // skip: true,
    name: '1st val: object | nested not equal to outer',
    input: [
      {
        c: {
          c1: 2,
          c2: 2,
        },
        a: 1,
        b: 1,
      },
    ],
    output: false,
  },
  {
    // skip: true,
    name: '2 layer nesting (true)',
    input: [
      {
        a: {
          a1: 2,
          a2: 2,
        },
        b: {
          b1: 2,
          b2: 2,
        },
        c: 2,
      },
    ],
    output: true,
  },
  {
    // only: true,
    name: '2+ layer nesting (false)',
    input: [
      {
        a: {
          a1: 2,
          a2: 2,
        },
        b: {
          b1: 1,
          b2: 1,
        },
        c: 2,
      },
    ],
    output: false,
  },
  {
    // skip: true,
    name: 'empty object',
    input: [{}],
    output: true,
  },
  {
    // only: true,
    name: 'mixed undefined, null',
    input: [
      {
        a: undefined,
        b: null,
        c: undefined,
        d: null,
      },
    ],
    output: false,
  },
  {
    // only: true,
    name: 'undefined and defined',
    note: 'easy fix, only apply TEST if you have ample time',
    input: [
      {
        a: undefined,
        b: {
          b1: 1,
          b2: 1,
        },
        c: undefined,
      },
    ],
    output: false,
  },
]

describe('areLeavesEqual()', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
