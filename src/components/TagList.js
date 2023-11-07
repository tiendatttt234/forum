import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Table } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import DefaultLayout from "../layouts/DefaultLayout";
import { useUser } from "../hooks/useUser";
import { Pencil, Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const TagList = () => {
    const [user] = useUser();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/tags")
            .then((resp) => resp.json())
            .then((data) => {
                setTags(data);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Do you want to remove product - ID: " + id + "?")) {
            fetch("http://localhost:9999/tags/" + id, {
                method: "DELETE",
            })
                .then(() => {
                    toast.success("Delete successfully!");
                    setTags(tags.filter((t) => t.id !== id));
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    return (
        <DefaultLayout>
            <Container>
                <div>
                    <h2 style={{ color: "black", textAlign: "center" }}>List of tags</h2>
                    {user?.role >= 2 && (
                        <Link to={"/tag/create"}>
                            <Button variant="primary" style={{ marginLeft: "90%" }}>
                                New Tag
                            </Button>
                        </Link>
                    )}

                    <div
                        className="tag-list"
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Row className="tag-row">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Topic</th>
                                        <th>Created</th>
                                        <th>Description</th>
                                        <th>Views</th>
                                        {user?.role >= 2 && (
                                            <React.Fragment>
                                                <th colSpan={2}>Action</th>
                                            </React.Fragment>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.map((t) => (
                                        <tr key={t.id}>
                                            <td>{t.id}</td>
                                            <td style={{ color: "white" }}>
                                                <Badge bg="secondary">{t.topic}</Badge>
                                            </td>
                                            <td>{new Date(t.created).toLocaleDateString("en-US")}</td>
                                            <td>{t.description}</td>
                                            <td>{t.views}</td>
                                            {user?.role >= 2 && (
                                                <React.Fragment>
                                                    <td>
                                                        <Link to={"#"} onClick={() => handleDelete(t.id)}>
                                                            <Trash></Trash>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={"/tag/edit/" + t.id}>
                                                            <Pencil></Pencil>
                                                        </Link>
                                                    </td>
                                                </React.Fragment>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                </div>
            </Container>
        </DefaultLayout>
    );
};

export default TagList;
