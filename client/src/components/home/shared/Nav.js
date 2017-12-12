import React from 'react'

import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'

const NavBar = () => (
  <Navbar color='faded' light expand='xs'>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={false} navbar>
      <Nav className='mx-auto' navbar>
        <NavItem>
          <NavLink exact to='/' className='nav-link'>New</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/join' className='nav-link'>Join</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/what' className='nav-link'>What?</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
)

export default withRouter(NavBar)
