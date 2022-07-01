import { Navbar, Nav, Container } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

export default function NavBar({ handleAddShow }) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Users Library</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleAddShow}>
            <PlusCircle />
            <span className="btn-label">Add User</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
