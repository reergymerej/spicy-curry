const greater = (a, b) => a > b
const lesser = (a, b) => a < b
const equal = (a, b) => a === b
const is = (a) => (b) => a === b

const checkByValue = (checker) => (value) => checker(value)
const checkByField = (comparer) => (field) => (value, threshold) => comparer(value, threshold[field])
const checkOverField = checkByField(greater)
const checkEqualField = checkByField(equal)
const checkUnderField = checkByField(lesser)
const checkEqual7 = checkByValue(is(7))
const checkEqual3 = checkByValue(is(3))
const checkEqualExpected = checkEqualField('expected')
const checkOverHigh = checkOverField('high')
const checkUnderLow = checkUnderField('low')
const checkOverExpected = checkOverField('expected')
const yes = () => true

const findConditionAndOperate = (conditions) => (item, threshold) =>
  conditions.find(
    ({ condition }) => condition(item.value, threshold)
  ).operation(item)

const getValueReplacer = (prop) => (object, value) => ({...object, [prop]: value})
const statusReplacer = getValueReplacer('status')
const preloadStatusReplacerValue = (value) => (object) => statusReplacer(object, value)
const statusWithThree = preloadStatusReplacerValue('THREE')
const statusWithSeven = preloadStatusReplacerValue('SEVEN')
const statusWithPerfect = preloadStatusReplacerValue('PERFECT')
const statusWithError = preloadStatusReplacerValue('ERROR')
const statusWithWarning = preloadStatusReplacerValue('WARNING')
const statusWithOK = preloadStatusReplacerValue('OK')

const logic = [
  {
    condition: checkEqual3,
    operation: statusWithThree,
  },
  {
    condition: checkEqual7,
    operation: statusWithSeven,
  },
  {
    condition: checkEqualExpected,
    operation: statusWithPerfect,
  },
  {
    condition: checkOverHigh,
    operation: statusWithError,
  },
  {
    condition: checkOverExpected,
    operation: statusWithWarning,
  },
  {
    condition: checkUnderLow,
    operation: statusWithError,
  },
  {
    condition:  yes,
    operation: statusWithOK,
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
