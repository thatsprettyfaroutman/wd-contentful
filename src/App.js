import React, { Component } from 'react'
import './App.css'

import { getEntries } from './Api'

import {
  Container,
  Row,
  Col,
} from './Grid'
import Card from './Card'
import Hero from './Hero'
import Entry from './Entry'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entries: [],
      selectedEntry: null,
    }

    getEntries().then(entries => { this.setState({ entries }) })
  }

  renderHome() {
    return (
      <Container>
        <Row heroHeight>
          <Col>
            <Hero title="Wunderdog" />
          </Col>
        </Row>
        <Row tag="ul" style={{overflow:'hidden'}}>
          {this.state.entries.map(item => (
            <Col key={item.id} tag="li">
              <Card
                title={item.title}
                image={item.images[0]}
                onClick={() => {
                  this.setState({
                    selectedEntry: item.id
                  })
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    )
  }

  renderPage() {
    const entry = this.state.entries.find(entry => entry.id === this.state.selectedEntry)
    if (!entry) {
      this.setState({
        selectedEntry: null
      })
      return null
    }
    return (
      <Entry
        entry={entry}
        onClick={() => {
          this.setState({
            selectedEntry: null
          })
        }}
      />
    )
  }

  render() {
    return this.state.selectedEntry ? this.renderPage() : this.renderHome()
  }
}

export default App
