import React from 'react'
import './Entry.css'

import {
  Container,
  Row,
  Col,
} from './Grid'
import LoadingImage from './LoadingImage'

export default ({ entry, onClick }) => (
  <Container className="Entry">
    <Row>
      <Col className="Entry__top">
        <Row fullWidth fullHeight style={{position: 'absolute'}}>
          { entry.images.map(image => (
            <Col style={{position:'relative'}}>
              <LoadingImage
                src={image.url}
                thumbSrc={image.thumbUrl}
              />
            </Col>
          )) }
        </Row>
        <h1 className="Entry__title">{entry.title}</h1>
        <a
          className="Entry__backLink"
          href="#"
          onClick={e => {
            e.preventDefault()
            if (onClick) onClick(e)
          }}
          children="Back"
        />
      </Col>
    </Row>
    <Row centerItems>
      <Col textWidth className="Entry__body">
        {entry.body.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </Col>
    </Row>
  </Container>
)
