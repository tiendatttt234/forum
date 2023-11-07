import { Button, Container, Form, Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { numberToRole } from "../utils";
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:9999/users")
            .then((x) => x.json())
            .then((x) => x.filter((x) => x.account.toLowerCase().includes(search.toLowerCase())))
            .then((x) => setUsers(x));
    }, [search]);

    const handleBan = (selectedUser) => {
        fetch(`http://localhost:9999/users/${selectedUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...selectedUser, isBan: !selectedUser.isBan }),
        })
            .then((x) => {
                if (x.ok) {
                    setUsers(
                        users.map((user) => {
                            if (user.id === selectedUser.id) return { ...user, isBan: !user.isBan };
                            return user;
                        })
                    );

                    toast("Ban user successfully!");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <DefaultLayout>
            <Container>
                <h1 style={{ textAlign: "center" }}>User list</h1>
                <Form.Control
                    type="text"
                    placeholder="Search by username..."
                    style={{ marginBottom: "20px", width: "300px", marginLeft: "auto" }}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Account</th>
                            <th>Role</th>
                            <th>IsBan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((x) => (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.account}</td>
                                <td>{numberToRole(x.role)}</td>
                                <td>{x.isBan ? <span style={{ color: "red" }}>Yes</span> : "No"}</td>
                                <td>
                                    <Link to={`/profile/${x.id}`}>
                                        <Button variant="primary">Profile</Button>
                                    </Link>
                                    {"  "}
                                    <Button variant="danger" onClick={() => handleBan(x)}>
                                        {x.isBan ? "Unban" : "Ban"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </DefaultLayout>
    );
};

export default UserListScreen;
