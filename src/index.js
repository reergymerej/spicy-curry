export const basic = (thresholds, data) => data.map((item) => {
  const newItem = {...item}
  const threshold = thresholds[item.name]
  if (threshold) {
    const { value } = item
    if (value === threshold.expected) {
      newItem.status = 'PERFECT'
    } else if (Math.abs(threshold.expected - value) <= 1) {
      newItem.status = 'ALMOST_PERFECT'
    } else if (value === 3) {
      newItem.status = 'THREE'
    } else if (value === 9) {
      newItem.status = 'NINE'
    } else if (value === 7) {
      newItem.status = 'SEVEN'
    } else if (value > threshold.high) {
      newItem.status = 'ERROR'
    } else if (value > threshold.expected) {
      newItem.status = 'WARNING'
    } else if (value < threshold.low) {
      newItem.status = 'ERROR'
    } else {
      newItem.status = 'OK'
    }
  }
  return newItem
})

export { versionA } from './version-a'
