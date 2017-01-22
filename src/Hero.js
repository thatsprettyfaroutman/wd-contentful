import React, { Component } from 'react'
import './Hero.css'
import classNames from 'classnames'
import { prefixedStyle } from './Utils'

import LoadingImage from './LoadingImage'

const ANIM_PREPARING = 0
const ANIM_STARTED = 1
const ANIM_DONE = 2

export default class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animState: ANIM_PREPARING,
    }
    this._unmounted = false
    this._titleLetterDoms = {}
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  componentDidMount() {
    this._animPrepare()
      .then(() => this._animStart())
      .then(() => this._animEnd())
      .catch(reason => {
        // console.log(reason)
      })
  }

  _animPrepare() {
    return new Promise(resolve => {
      Object.keys(this._titleLetterDoms).forEach(id => {
        const dom = this._titleLetterDoms[id]
        const x = Math.random() * 1000 - 300
        const y = Math.random() * 600 - 300
        const r = Math.random() * 360 - 180
        const delay = Math.random() * 2000 + 500
        prefixedStyle(dom, 'transform', `
          translate3d(${x}px, ${y}px, 0)
          rotate3d(0, 0, 1, ${r}deg)
          scale3d(0, 0, 1)
        `)
        prefixedStyle(dom, 'transitionDelay', `${delay}ms`)
      })
      setTimeout(resolve, 100)
    })
  }

  _animStart() {
    if (this._unmounted) return Promise.reject('unmounted')
    return new Promise(mainResolve => {
      this.setState({ animState: ANIM_STARTED }, () => {
        Promise.all(Object.keys(this._titleLetterDoms).map(id => {
          const dom = this._titleLetterDoms[id]
          prefixedStyle(dom, 'transform', `
            translate3d(0, 0, 0)
            rotate3d(0, 0, 1, 0deg)
            scale3d(1, 1, 1)
          `)
          return new Promise(resolve => {
            dom.addEventListener('transitionend', () => {
              resolve(id)
            })
          })
        })).then(res => {
          mainResolve()
        })
      })
    })
  }

  _animEnd() {
    if (this._unmounted) return Promise.reject('unmounted')
    this.setState({
      animState: ANIM_DONE
    })
  }


  render() {
    const {
      title,
      image,
      className,
      reference,
      style,
    } = this.props

    let classes = classNames({
      'Hero': true,
      'Hero--animating': this.state.animState === ANIM_STARTED
    })
    classes = `${classes} ${className ? className : ''}`

    const content = [
      !image ? null : (
        <div className="Hero__image">
          <LoadingImage
            src={image.url}
            thumbSrc={image.thumbUrl}
          />
        </div>
      ),
      <h1 className="Hero__title">{this._renderTitle(title)}</h1>
    ]

    return (
      <section
        className={classes}
        style={style}
        ref={reference}
        children={content}
      />
    )
  }

  _renderTitle(title) {
    return title.split('').map((letter, i) =>
      <span
        className={`letter-${letter}`}
        key={`${i}${letter}`}
        ref={dom => { this._titleLetterDoms[`${i}${letter}`] = dom }}
        children={letter}
      />
    )
  }
}
