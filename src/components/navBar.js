import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

export default function NavBar({ handleAddShow, handleSearch }) {
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
