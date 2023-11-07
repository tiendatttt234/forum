import { NavDropdown, Navbar } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const HeaderAcct = () => {
    const nav = useNavigate();
    const [user, setUser] = useUser();

    const handleSignOut = () => {
        setUser(undefined);
        nav("/login");
    }

    if (user) {
        return (
            <NavDropdown
                style={{ color: "white" }}
                title={
                    <Navbar.Text>
                        Hi, <span style={{ color: 'white' }}>{user.name}</span>
                    </Navbar.Text>
                }
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item href={`/profile/${user.id}`}>My Profile</NavDropdown.Item>
                {user.role >= 2 && <NavDropdown.Item href="/user-list">Admin dashboard </NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
            </NavDropdown>
        );
    } else {
        return (
            <Navbar.Text>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </Navbar.Text>
        );
    }
};

export default HeaderAcct;
