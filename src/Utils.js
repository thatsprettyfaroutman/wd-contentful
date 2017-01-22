export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export const prefixedStyle = (element, property, value) => {
  element.style[camelize(`webkit ${property}`)] = value
  element.style[camelize(`moz ${property}`)] = value
  element.style[camelize(`ms ${property}`)] = value
  element.style[camelize(`o ${property}`)] = value
  element.style[camelize(`${property}`)] = value
  return element
}
