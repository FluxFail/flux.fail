exports.median = (arr) => {
  const values = arr
  values.sort((a, b) => a - b)
  const lowMiddle = Math.floor((values.length - 1) / 2)
  const highMiddle = Math.floor((values.length - 1) / 2)
  return (values[lowMiddle] + values[highMiddle]) / 2
}
