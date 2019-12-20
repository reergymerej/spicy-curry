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
    odd: true,
  },
  {
    name: 'a',
    value: 6,
    status: 'ERROR',
    even: true,
  },
  {
    name: 'b',
    value: 3,
    odd: true,
    status: 'THREE',
  },
  {
    name: 'b',
    value: 9,
    odd: true,
    status: 'NINE',
  },
  {
    name: 'b',
    value: 19,
    odd: true,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'b',
    value: 20,
    status: 'PERFECT',
    even: true,
  },
  {
    name: 'c',
    value: -4,
    status: 'ERROR',
    even: true,
  },
  {
    name: 'c',
    value: 7,
    odd: true,
    status: 'SEVEN',
  },
  {
    name: 'c',
    value: 17,
    odd: true,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'c',
    value: 19,
    odd: true,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'c',
    value: 20,
    even: true,
    status: 'WARNING',
  },
  {
    name: 'd',
    value: 0,
    status: 'PERFECT',
    even: true,
  },
  {
    name: 'd',
    value: 1,
    odd: true,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'd',
    value: -1,
    odd: true,
    status: 'ALMOST_PERFECT',
  },
  {
    name: 'd',
    value: 3,
    odd: true,
    status: 'THREE',
  },
]

describe('basic', () => {
  it('basic', () => {
    expect(mod.basic(thresholds,data)).toEqual(expected)
  })

  it('versionA', () => {
    expect(mod.versionA(thresholds,data)).toEqual(expected)
  })
})

