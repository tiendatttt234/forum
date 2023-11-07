import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Card, ListGroup } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";

export default function ThreadDetailScreen() {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const navigate = useNavigate();
    const [user] = useUser(); // Get logged-in user data

    useEffect(() => {
        const fetchThreadDetails = async () => {
            try {
                const threadResponse = await fetch(`http://localhost:9999/threads/${threadId}`);
                const threadData = await threadResponse.json();

                // Increment the view count
                await updateViewCount(threadData);

                setThread(threadData);

                const postsResponse = await fetch(`http://localhost:9999/posts?threadId=${threadId}`);
                const postsData = await postsResponse.json();
                setPosts(postsData);

                // Fetch user data for each post
                const userIds = postsData.map((post) => post.userId);
                const uniqueUserIds = Array.from(new Set(userIds));
                const usersResponse = await Promise.all(uniqueUserIds.map((userId) => fetchUser(userId)));
                const usersData = await Promise.all(usersResponse.map((response) => response.json()));
                setUsers(usersData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchThreadDetails();
    }, [threadId]);

    const fetchUser = async (userId) => {
        const response = await fetch(`http://localhost:9999/users/${userId}`);
        return response;
    };

    const getUserById = (userId) => {
        return users.find((user) => user.id === userId);
    };

    const updateViewCount = async (threadData) => {
        const updatedThread = { ...threadData, views: threadData.views + 1 };

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedThread),
        };

        await fetch(`http://localhost:9999/threads/${threadId}`, requestOptions);
    };

    const deletePost = (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");

        if (confirmDelete) {
            fetch(`http://localhost:9999/posts/${postId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        // Remove the deleted post from the posts state
                        setPosts(posts.filter((post) => post.id !== postId));
                        toast.success("Post deleted successfully.");
                    } else {
                        toast.error("Failed to delete the post.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const canEditPost = (postUserId) => {
        // Check if the user is logged in and the post belongs to them
        if (user && postUserId === user.id) {
            return true;
        }
        // Check if the user is an admin or moderator
        if (user && (user.role === 2 || user.role === 3)) {
            return true;
        }
        return false;
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <DefaultLayout>
                <Container>
                    <p>Loading...</p>
                </Container>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <Container>
                <h2>Thread Details</h2>
                <Card>
                    <Card.Body>
                        <Card.Title>{thread.title}</Card.Title>
                        <Card.Text>Created: {new Date(thread.created).toLocaleString()}</Card.Text>
                        <Card.Text>Views: {thread.views}</Card.Text>
                    </Card.Body>
                </Card>

                <h3>Posts</h3>
                <Link to={`/createPost/${threadId}`}>
                    <button>New Post</button>
                </Link>

                <ListGroup>
                    {currentPosts.map((post) => (
                        <ListGroup.Item key={post.id}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <Link to={`/profile/${post.userId}`}>{getUserById(post.userId)?.name}</Link>
                                            <Card.Text>
                                                {post.userId === 1 && "User"}
                                                {post.userId === 2 && "Moderator"}
                                                {post.userId === 3 && "Admin"}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={12} md={8}>
                                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {canEditPost(post.userId) && (
                                                <>
                                                    <Button variant="danger" onClick={() => deletePost(post.id)}>
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => navigate(`/editPost/${post.id}`)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </Container>
        </DefaultLayout>
    );
}

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            href="#"
                            onClick={() => paginate(number)}
                            className={`page-link ${currentPage === number ? "active" : ""}`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
