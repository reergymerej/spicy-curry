import * as mod from '.'

const data = [
  {
    name: 'a',
    value: 3,
  },
  {
    name: 'a',
    value: 6,
  },
  {
    name: 'b',
    value: 3,
  },
  {
    name: 'b',
    value: 9,
  },
  {
    name: 'b',
    value: 19,
  },
  {
    name: 'b',
    value: 20,
  },
  {
    name: 'c',
    value: -4,
  },
  {
    name: 'c',
    value: 7,
  },
  {
    name: 'c',
    value: 17,
  },
  {
    name: 'c',
    value: 19,
  },
  {
    name: 'c',
    value: 20,
  },
  {
    name: 'd',
    value: 0,
  },
  {
    name: 'd',
    value: 1,
  },
  {
    name: 'd',
    value: -1,
  },
  {
    name: 'd',
    value: 3,
  },
]

const thresholds = {
  a: {
    low: 0,
    expected: 3,
    high: 5,
  },
  b: {
    low: 0,
    expected: 20,
    high: 50,
  },
  c: {
    low: 10,
    expected: 18,
    high: 20,
  },
  d: {
    expected: 0,
  },
}

const expected = [
  {
    name: 'a',
    value: 3,
    status: 'PERFECT',
  },
  {
    name: 'a',
    value: 6,
    status: 'ERROR',
  },
  {
    name: 'b',
    value: 3,
    status: 'THREE',
  },
  {
    name: 'b',
    value: 9,
    status: 'NINE',
  },
  {
    name: 'b',
    value: 19,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'b',
    value: 20,
    status: 'PERFECT',
  },
  {
    name: 'c',
    value: -4,
    status: 'ERROR',
  },
  {
    name: 'c',
    value: 7,
    status: 'SEVEN',
  },
  {
    name: 'c',
    value: 17,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'c',
    value: 19,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'c',
    value: 20,
    status: 'WARNING',
  },
  {
    name: 'd',
    value: 0,
    status: 'PERFECT',
  },
  {
    name: 'd',
    value: 1,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'd',
    value: -1,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'd',
    value: 3,
    status: 'THREE',
  },
]

describe('basic', () => {
  fit('basic', () => {
    expect(mod.basic(thresholds,data)).toEqual(expected)
  })

  it('versionA', () => {
    expect(mod.versionA(thresholds,data)).toEqual(expected)
  })
})

