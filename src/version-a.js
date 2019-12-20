const greater = (a, b) => a > b
const lesser = (a, b) => a < b
const equal = (a, b) => a === b
const is = (a) => (b) => a === b

const checkByValue = (checker) => (value) => checker(value)
const checkByField = (comparer) => (field) => (value, threshold) => comparer(value, threshold[field])
const checkOverField = checkByField(greater)
const checkEqualField = checkByField(equal)
const checkUnderField = checkByField(lesser)
const yes = () => true

const findConditionAndOperate = (conditions) => (item, threshold) =>
  conditions.find(
    ({ condition }) => condition(item.value, threshold)
  ).operation(item)

const getValueReplacer = (prop) => (object, value) => ({...object, [prop]: value})
const preloadStatusReplacerValue = (value) => (object) => getValueReplacer('status')(object, value)
const statusWithError = preloadStatusReplacerValue('ERROR')

const logic = [
  {
    condition: checkEqualField('expected'),
    operation: preloadStatusReplacerValue('PERFECT'),
  },
  {
    condition: checkByValue(is(9)),
    operation: preloadStatusReplacerValue('NINE'),
  },
  {
    condition: checkByValue(is(3)),
    operation: preloadStatusReplacerValue('THREE'),
  },
  {
    condition: checkByValue(is(7)),
    operation: preloadStatusReplacerValue('SEVEN'),
  },
  {
    condition: checkOverField('high'),
    operation: statusWithError,
  },
  {
    condition: checkOverField('expected'),
    operation: preloadStatusReplacerValue('WARNING'),
  },
  {
    condition: checkUnderField('low'),
    operation: statusWithError,
  },
  {
    condition:  yes,
    operation: preloadStatusReplacerValue('OK'),
  },
]

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
