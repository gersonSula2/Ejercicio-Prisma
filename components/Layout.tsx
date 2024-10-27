import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand>Mi Aplicación</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Inicio</Nav.Link>
              </Link>
              <Link href="/productos" passHref legacyBehavior>
                <Nav.Link>Productos</Nav.Link>
              </Link>
              <Link href="/productos/crear" passHref legacyBehavior>
                <Nav.Link>Crear Producto</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;