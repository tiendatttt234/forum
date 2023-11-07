import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { numberToRole } from "../utils";



const RoleAssignment = () => {
    const { profileId } = useParams();
    const [newRole, setNewRole] = useState(1);
    const [data, setData] = useState();
    const [user, setUser] = useUser();

    useEffect(() => {
        fetch(`http://localhost:9999/users/${profileId}`)
            .then((x) => x.json())
            .then((x) => setData(x));
    }, [profileId]);

    const handleUpdate = () => {
        fetch(`http://localhost:9999/users/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, role: newRole }),
        })
            .then((x) => {
                if (user.id === profileId) setUser({ ...user, role: newRole }); 
                toast("Change role successfully!");
            })
            .catch((err) => toast("Change role failed!"));
    };

    return (
        <div className="modal show" style={{ display: "block", position: "initial" }}>
            <Modal.Dialog>
                <Modal.Header style={{ background: "#eee" }}>
                    <Modal.Title>Role Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        User <span style={{ color: "red" }}>{data?.account}</span> is currently a{" "}
                        <span style={{ color: "red" }}>{numberToRole(data?.role)}</span>
                    </p>
                    <Form.Label>New Role</Form.Label>
                    <span style={{ color: "red" }}>*</span>
                    <Form.Select value={newRole} onChange={(e) => setNewRole(parseInt(e.target.value))}>
                        <option value="3">Admin</option>
                        <option value="1">User</option>
                    </Form.Select>
                </Modal.Body>

                <Modal.Footer
                    style={{
                        background: "#eee",
                        justifyContent: "flex-start",
                    }}
                >
                    <Button style={{ background: "green" }} variant="secondary" onClick={handleUpdate}>
                        Grant Role
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default RoleAssignment;
