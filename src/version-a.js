const greater = (a, b) => a > b
const lesser = (a, b) => a < b

const checkByField = (comparer) => (field) => (value, threshold) => comparer(value, threshold[field])
const checkOverField = checkByField(greater)
const checkUnderField = checkByField(lesser)
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
const statusWithError = preloadStatusReplacerValue('ERROR')
const statusWithWarning = preloadStatusReplacerValue('WARNING')
const statusWithOK = preloadStatusReplacerValue('OK')

const logic = [
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
