import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPostScreen = () => {
    const { postId } = useParams();
    const [old, setOld] = useState();
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [user] = useUser();

    useEffect(() => {
        fetch(`http://localhost:9999/posts/${postId}`)
            .then((response) => response.json())
            .then((postData) => {
                setOld(postData);
                setContent(postData.content);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [postId]);

    const handleEdit = () => {
        const updatedPost = { ...old, content };

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost),
        };

        fetch(`http://localhost:9999/posts/${postId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    toast("Post edited successfully!");
                    navigate(`/thread/${old.threadId}`);
                } else {
                    throw new Error("Failed to edit the post.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-1 m-lg-5">
                    <Card.Header>
                        <Card.Title>Edit Post</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form.Label>Post Content</Form.Label>
                        <ReactQuill value={content} onChange={setContent} />

                        <Button type="submit" className="my-2" onClick={handleEdit}>
                            Save Changes
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </DefaultLayout>
    );
};

export default EditPostScreen;
