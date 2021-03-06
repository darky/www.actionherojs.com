import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap'

export default class extends React.Component {
  render () {
    if (!this.props.message) { return null }

    return (
      <Row>
        <Col md={12}>
          <Alert bsStyle='success'> {this.props.message.toString()} </Alert>
        </Col>
      </Row>
    )
  }
}
