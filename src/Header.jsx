import React from 'react';
import { Navbar, NavItem, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginButton from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Container>
          <Row>
            <Col><NavItem><Link to="/" className="nav-link">Home</Link></NavItem></Col>
            <Col><NavItem><Link to="/about" className="nav-link">About</Link></NavItem></Col>
            {this.props.auth0.isAuthenticated ? ( <Col><NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem></Col> ) : ( '' )}
          </Row>
          {this.props.auth0.isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </Container>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
