import React, { Component } from 'react'
import { Badge, Nav, Navbar, NavItem } from 'react-bootstrap'

class Menu extends Component {
  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>SUMMVS</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href='#'>Sign In/Register</NavItem>
            <NavItem eventKey={2} href='/about'>About</NavItem>
            <NavItem eventKey={3} href='/buy'>Buy</NavItem>
            <NavItem eventKey={4} href='/cart'>
              Cart
              <Badge className='badge'>
                1
              </Badge>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu
