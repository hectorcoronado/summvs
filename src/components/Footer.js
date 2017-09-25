import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

class Footer extends Component {
  render () {
    return (
      <Navbar fixedBottom>
        <Nav>
          <NavItem>made by Hector Coronado</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Footer
