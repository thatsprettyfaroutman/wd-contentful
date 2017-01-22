import React from 'react'
import './Grid.css'

const classnamify = (prefix, props) => {
  const classes = [prefix]
  if (props.fullHeight) classes.push(`Grid__fullHeight`)
  if (props.fullWidth) classes.push(`Grid__fullWidth`)
  if (props.heroHeight) classes.push(`Grid__heroHeight`)
  if (props.textWidth) classes.push(`Grid__textWidth`)
  if (props.centerItems) classes.push(`Grid__centerItems`)
  if (props.className) classes.push(props.className)
  return classes.join(' ')
}

const elementCreator = baseClass => props => React.createElement(
  props.tag ? props.tag : 'div', {
    className: classnamify(baseClass, props),
    style: props.style,
  },
  props.children,
)

export const Container = elementCreator('Grid__container')
export const Row = elementCreator('Grid__row')
export const Col = elementCreator('Grid__col')
