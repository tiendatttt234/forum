import { useEffect, useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLayout from "../layouts/DefaultLayout";
const TagEdit = () => {
    const { tid } = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [topic, setTopic] = useState("");
    const [created, setCreated] = useState("");
    const [description, setDescription] = useState("");
    const [views, setViews] = useState("");
    useEffect(() => {
        fetch(" http://localhost:9999/tags/" + tid)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setId(res.id);
                setTopic(res.topic);
                setCreated(res.created);
                setDescription(res.description);
                setViews(res.views);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, topic, created, description, views };
        if (topic.length === 0 || description.length === 0 || views.length <= 0) {
            toast.error("Please fill all fields");
        } else {
            fetch(" http://localhost:9999/tags/" + tid, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(empdata),
            })
                .then(() => {
                    toast.success("Saved successfully.");
                    navigate("/tag");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };
    return (
        <DefaultLayout>
            <Container>
                <Card className="m-5">
                    <Card.Header style={{ textAlign: "center" }}>Edit Tags</Card.Header>
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

                            <Button type="submit">Submit</Button>
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
export default TagEdit;
