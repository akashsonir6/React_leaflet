import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div style={{borderBottom:"2px solid black"}}>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Talking Lands</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Multiple Point Map
            </Nav.Link>
            <Nav.Link as={Link} to="/polygon">
             Polygon Map
            </Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;