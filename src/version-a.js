const greater = (a, b) => a > b
const lesser = (a, b) => a < b
const within = (distance, a, b) => Math.abs(a - b) <= distance
const equal = (a, b) => a === b
const equals = (a) => (b) => a === b
const yes = () => true
const getField = (field, object) => object[field]

const getValueReplacer = (prop) => (object, value) => ({...object, [prop]: value})
const preloadStatusReplacerValue = (value) => (object) => getValueReplacer('status')(object, value)
const statusWithError = preloadStatusReplacerValue('ERROR')

const logic = [
  {
    field: 'expected',
    condition: equal,
    operation: preloadStatusReplacerValue('PERFECT'),
  },
  {
    field: 'expected',
    condition: (a, b) => within(1, a, b),
    operation: preloadStatusReplacerValue('ALMOST_PERFECT'),
  },
  {
    condition: equals(9),
    operation: preloadStatusReplacerValue('NINE'),
  },
  {
    condition: equals(3),
    operation: preloadStatusReplacerValue('THREE'),
  },
  {
    condition: equals(7),
    operation: preloadStatusReplacerValue('SEVEN'),
  },
  {
    field: 'high',
    condition: greater,
    operation: statusWithError,
  },
  {
    field: 'expected',
    condition: greater,
    operation: preloadStatusReplacerValue('WARNING'),
  },
  {
    field: 'low',
    condition: lesser,
    operation: statusWithError,
  },
  {
    condition: yes,
    operation: preloadStatusReplacerValue('OK'),
  },
]

const findConditionAndOperate = (conditions) => (item, threshold) =>
  conditions.find(
    ({ condition, field }) =>
      condition(
        getField('value', item),
        getField(field, threshold)
      )
  ).operation(item)

const getStatusSetter = (threshold, item) =>
  findConditionAndOperate(logic)(item, threshold)

const getItemUpdater = (thresholds) => (item) => {
  const threshold = thresholds[item.name]
  return threshold
    ? getStatusSetter(threshold, item)
    : item
}

export const versionA = (thresholds, data) =>
  data.map(getItemUpdater(thresholds))
