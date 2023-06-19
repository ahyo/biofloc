import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import { logoutAction } from "../actions";

const MemberLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction());

    router.push("/login");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Biofloc</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-pills">
            <Nav.Link
              href="/"
              className={router.pathname === "/" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/users"
              className={router.pathname === "/users" ? "active" : ""}
            >
              Users
            </Nav.Link>
            <Nav.Link
              href="/buyers"
              className={router.pathname === "/buyers" ? "active" : ""}
            >
              Buyers
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action-1">Action 1</NavDropdown.Item>
              <NavDropdown.Item href="#action-2">Action 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto"></Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <br />
        {children}
      </Container>
    </div>
  );
};

export default MemberLayout;
