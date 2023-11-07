import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditThreadScreen = () => {
    const { threadId } = useParams();
    const [old, setOld] = useState();

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTag] = useState([]);
    const [chosenTag, setChosenTag] = useState(1);
    const [title, setTitle] = useState("");
    const nav = useNavigate();
    const [user] = useUser();

    useEffect(() => {
        fetch("http://localhost:9999/tags")
            .then((x) => x.json())
            .then((x) => x.filter((at) => !selectedTags.find((st) => st.id === at.id)))
            .then((x) => {
                setTags(x);
                setChosenTag(x[0]?.id);
            });
    }, [selectedTags]);

    useEffect(() => {
        fetch(`http://localhost:9999/threads/${threadId}`)
            .then((x) => x.json())
            .then((x) => {
                setOld(x);
                setTitle(x.title);
                fetch("http://localhost:9999/tags")
                    .then((x) => x.json())
                    .then((tags) => {
                        setSelectedTag(tags?.filter((f) => x.tagIds.includes(f.id)));
                    });
            });
    }, [threadId]);

    const handleCreate = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch(`http://localhost:9999/threads/${old.id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                ...old,
                title,
                tagIds: selectedTags.map(x => x.id),
            }),
        });

        toast("Edited successfully!");
        nav(`/thread/${old.id}`);
    };

    const handleAddTag = () => {
        const newTag = tags.find((x) => x.id === chosenTag);
        if (newTag) {
            setSelectedTag([...selectedTags, newTag]);
        }
    };

    const handleRemoveTag = (e) => {
        setSelectedTag(selectedTags.filter((x) => x.id !== e));
    };

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-1 m-lg-5">
                    <Card.Header>
                        <Card.Title>New thread</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <Form.Label>Thread title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter thread title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Form.Label>Thread tag</Form.Label>
                            <Form.Select value={chosenTag} onChange={(e) => setChosenTag(parseInt(e.target.value))}>
                                {tags.map((x) => (
                                    <option value={x.id} key={x.id}>
                                        {x.topic}
                                    </option>
                                ))}
                            </Form.Select>
                            <div>
                                {selectedTags.map((x) => (
                                    <Form.Check
                                        type="checkbox"
                                        key={x.id}
                                        label={x.topic}
                                        checked
                                        onClick={(e) => handleRemoveTag(x.id)}
                                    />
                                ))}
                            </div>

                            <Button type="submit" className="my-2" onClick={handleAddTag}>
                                Add tag
                            </Button>
                            <br />
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" className="my-2" onClick={handleCreate}>
                            Submit
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </DefaultLayout>
    );
};

export default EditThreadScreen;
