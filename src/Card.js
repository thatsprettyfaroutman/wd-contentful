import React, { Component } from 'react'
import './Card.css'
import LoadingImage from './LoadingImage'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.unmounted = false
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.unmounted) this.setState({
        loading: false
      })
    }, 3000)
  }

  render() {
    const {
      title,
      image,
      className,
      onClick,
      reference,
      style,
    } = this.props

    const classNames = `
      Card
      ${this.state.loading ? 'Card--loading' : ''}
      ${className ? className : ''}
    `

    const content = [
      !image ? null : (
        <div className="Card__image">
          <LoadingImage
            src={image.url}
            thumbSrc={image.thumbUrl}
          />
        </div>
      ),
      <h2 className="Card__title">{title}</h2>
    ]

    if (onClick) {
      return (
        <a
          className={classNames}
          style={style}
          ref={reference}
          children={content}
          href="#"
          onClick={e => {
            onClick(e)
            e.preventDefault()
          }}
        />
      )
    }

    return (
      <div
        className={classNames}
        style={style}
        ref={reference}
        children={content}
      />
    )
  }
}
