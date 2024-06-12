import React from 'react';
import { Navbar, NavItem, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginButton from './Login';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Container>
          <Row>
            <Col><NavItem><Link to="/" className="nav-link">Home</Link></NavItem></Col>
            <Col><NavItem><Link to="/about" className="nav-link">About</Link></NavItem></Col>
          </Row>
          <LoginButton />
        </Container>
      </Navbar>
    )
  }
}

export default Header;
