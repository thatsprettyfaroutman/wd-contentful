import React, { Component } from 'react'
import './LoadingImage.css'
import classNames from 'classnames'

export default class LoadingImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: !!props.thumbSrc,
    }

    this._unmounted = false

    if ( this.state.loading ) {
      this._loadImage().then(() => {
        if (!this._unmounted) this.setState({ loading: false })
      })
    }
  }

  componentWillUnmount() {
    this._unmounted = true
  }

  _loadImage() {
    return new Promise(resolve => {
      setTimeout(() => {
        const loader = new Image()
        loader.src = this.props.src
        loader.onload = loader.onerror = resolve
      }, this.props.delay ? this.props.delay : 0)
    })
  }

  render() {
    const {
      className,
      src,
      thumbSrc,
    } = this.props

    const componentClassName = classNames({
      'LoadingImage': true,
      'LoadingImage--useThumb': this.state.loading,
    })

    let thumb = null
    if ( thumbSrc ) {
      thumb = <div
        className="LoadingImage__thumb"
        style={{ backgroundImage: `url(${thumbSrc})` }}
      />
    }

    return (
      <div
        className={`${componentClassName} ${className ? className : ''}`}
        style={{ backgroundImage: this.state.loading ? 'none' : `url(${src})` }}
        children={thumb}
      />
    )
  }
}
