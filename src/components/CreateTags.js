import { useEffect, useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLayout from "../layouts/DefaultLayout";
const CreateTags = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [topic, setTopic] = useState("");
    const [created, setCreated] = useState("");
    const [description, setDescription] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, topic, created: new Date().toISOString(), description };
        if (topic.length === 0 || description.length === 0) {
            toast.error("Please fill all fields");
        } else {
            fetch("http://localhost:9999/tags", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...empdata, views: 0 }),
            })
                .then(() => {
                    toast.success("Add Tags successfully.");
                    navigate("/tag");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };
    // svdgfdbdfx

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-5">
                    <Card.Header style={{ textAlign: "center" }}>Create Tags</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group>
                                <Form.Label>
                                    Topic<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                                {topic.length == 0 && <label style={{ color: "red" }}>Please enter the topic</label>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Description<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                />
                                {description.length == 0 && (
                                    <label style={{ color: "red" }}>Please enter the description</label>
                                )}
                            </Form.Group>

                            <br />
                            <FormGroup>
                                <Button type="submit">Submit</Button>
                            </FormGroup>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={"/tag"}>Back to List</Link>
                    </Card.Footer>
                </Card>
            </Container>
        </DefaultLayout>
    );
};
export default CreateTags;
