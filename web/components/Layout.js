import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link href="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/buyers" passHref>
              Buyers
            </Link>

            {/* Tambahkan link-link lain di sini */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Container>
  );
};

export default Layout;
