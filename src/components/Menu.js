import React, { Component } from 'react'
import { Badge, Nav, Navbar, NavItem } from 'react-bootstrap'

class Menu extends Component {
  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a className='header-text' href='/'>SUMMVS</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href='#'>Sign In/Register</NavItem>
            <NavItem eventKey={2} href='/about'>About</NavItem>
            <NavItem eventKey={3} href='/cart'>
              Cart
                {
                  (this.props.cartItemsNumber > 0) ? (<Badge className='badge'> {this.props.cartItemsNumber}</Badge>) : ('')
                }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu
