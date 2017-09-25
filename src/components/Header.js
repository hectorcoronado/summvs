import React, { Component } from 'react'
import { Badge, Nav, Navbar, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      // show link to sign out & account
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/signout'>sign out</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/account'>account</Link>
        </li>
      ]
    } else {
      // show link to sign in or sign up:
      return [
        <li className='nav-item' key={3}>
          <Link className='nav-link' to='/signin'>sign in</Link>
        </li>,
        <li className='nav-item' key={4}>
          <Link className='nav-link' to='/signup'>sign up</Link>
        </li>
      ]
    }
  }

  render () {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand className='header-text'>
              <a href='/'>s u m m v s</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.renderLinks()}
              <LinkContainer to='/about'>
                <NavItem eventKey={2}>about</NavItem>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <NavItem eventKey={3}>
                  cart
                  {
                    (this.props.cartItemsNumber > 0)
                    ? (<Badge className='badge'> {this.props.cartItemsNumber}</Badge>)
                    : ('')
                  }
                </NavItem>
              </LinkContainer>
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
