import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Calendar, PencilSquare, PersonFill, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import TagBadge from "./TagBadge";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

const ThreadListItem = ({ thread, handleDelete }) => {
    const { id, title, views, created, tagIds, userId } = thread;
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState({});
    const [postCount, setPostCount] = useState(0);
    const [user] = useUser();

    useEffect(() => {
        fetch(`http://localhost:9999/tags?id=${tagIds?.join("&id=")}`)
            .then((x) => x.json())
            .then((x) => setTags(x));
    }, [tagIds]);

    useEffect(() => {
        fetch(`http://localhost:9999/users/${userId}`)
            .then((x) => x.json())
            .then((x) => setAuthor(x));
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:9999/posts?threadId=${id}`)
            .then((x) => x.json())
            .then((x) => setPostCount   (x.length));
    }, [id]);


    const showActions = user && (user.role >= 1 || user.id === userId);

    return (
        <ListGroup.Item>
            <Row>
                <Col xs={12} md={6}>
                    <Link to={`/thread/${id}`}>{title}</Link>
                    <div style={{ fontSize: 16 }}>
                        tags:{" "}
                        {tags.map((x) => (
                            <TagBadge key={x.id} tag={x} />
                        ))}
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div>
                        <PersonFill /> {author.name}
                    </div>
                    <div style={{ fontSize: 16 }}>
                        <Calendar /> {new Date(created).toLocaleString()}
                    </div>
                </Col>
                <Col xs={12} md={2}>
                    <div>Posts: {postCount}</div>
                    <div style={{ fontSize: 16 }}>Views: {views}</div>
                </Col>
            </Row>
            {showActions && (
                <div className="hor-align" style={{ gap: 4 }}>
                    <Link to={`/thread/${id}/edit`}>
                        <Button><PencilSquare/> Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(id)}><TrashFill/> Delete</Button>
                </div>
            )}
        </ListGroup.Item>
    );
};

export default ThreadListItem;
