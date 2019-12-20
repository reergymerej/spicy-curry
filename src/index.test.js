import * as mod from '.'

const data = [
  {
    name: 'a',
    value: 6,
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
    value: 19,
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
}

describe('basic', () => {
  test('basic', () => {
    expect(mod.basic(thresholds,data)).toEqual([
      {
        name: 'a',
        value: 6,
        status: 'ERROR',
      },
      {
        name: 'b',
        value: 20,
        status: 'OK',
      },
      {
        name: 'c',
        value: -4,
        status: 'ERROR',
      },
      {
        name: 'c',
        value: 19,
        status: 'WARNING',
      },
    ])
  })
})

