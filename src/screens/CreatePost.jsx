import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";

async function createNewPost(userId, threadId, content) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const postResp = await fetch("http://localhost:9999/posts", {
        method: "POST",
        headers,
        body: JSON.stringify({
            userId,
            threadId,
            content,
        }),
    });

    const postId = (await postResp.json()).id;
    return postId;
}

const CreatePostScreen = () => {
    const { threadId } = useParams();
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [user] = useUser(); // Get logged-in user data
    const userId = user ? user.id : null; // Access the userId property

    const handleCreate = () => {
        if (!userId) {
            navigate("/login");
            return;
        }

        // Process the content to remove <p> tags
        const processedContent = content.replace(/<\/?p>/g, "");

        createNewPost(userId, threadId, processedContent).then((postId) => {
            toast.success("Post created successfully!");
            navigate(`/thread/${threadId}`);
        });
    };

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-1 m-lg-5">
                    <Card.Header>
                        <Card.Title>New Post</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formContent">
                                <Form.Label>Post Content</Form.Label>
                                <ReactQuill theme="snow" value={content} onChange={setContent} />
                            </Form.Group>
                        </Form>
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

export default CreatePostScreen;
