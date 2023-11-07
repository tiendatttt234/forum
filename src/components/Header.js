import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAcct from "./HeaderAcct";
import { CupHot } from "react-bootstrap-icons";

export default function Header() {
    return (
        <Navbar expand="md" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="link-unstyled title">
                        <CupHot style={{ fontSize: "40px", color: "white" }} />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link className="link-unstyled" to="/tag">
                                Tags
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <HeaderAcct />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
