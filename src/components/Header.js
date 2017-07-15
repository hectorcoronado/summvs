import React, { Component } from 'react'
import { Badge, Nav, Navbar, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      // show link to sign out
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>sign out</Link>
        </li>
      )
    } else {
      // show link to sign in (or sign up):
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/signin'>sign in</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/signup'>sign up</Link>
        </li>
      ]
    }
  }

  render () {
    return (
      <div className='header-text'>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>|s|u|m|m|v|s|</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.renderLinks()}
              <NavItem eventKey={2} href='/about'>about</NavItem>
              <NavItem eventKey={3} href='/cart'>
              cart
              {
                (this.props.cartItemsNumber > 0) ? (<Badge className='badge'> {this.props.cartItemsNumber}</Badge>) : ('')
              }
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
