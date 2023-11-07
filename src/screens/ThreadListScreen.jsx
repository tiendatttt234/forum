import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import ThreadListItem from "../components/ThreadListItem";
import { useEffect, useState } from "react";
import { Cup, PlusLg, Search } from "react-bootstrap-icons";
import { Link, json } from "react-router-dom";
import SearchThreads from "../components/SearchThreads";
import { toast } from "react-toastify";
import {CupHot} from "react-bootstrap-icons";

const ITEM_PER_PAGE = 10;

export default function ThreadListScreen() {
    const [threads, setThreads] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [tagDict, setTagDict] = useState([]);
    const [pageIdx, setPageIdx] = useState(0);
    const [searchParams, setSearchParams] = useState();

    useEffect(() => {
        const params = searchParams || {
            query: "",
            author: -1,
            tags: []
        };

        const tsQuery = params.query === "" ? "" : `q=${params.query}&`;
        const userQuery = params.author === -1 ? "" : `userId=${params.author}&`;
        const tagsQuery = params.tags.length === 0 ? "" : `tagIds_like=${params.tags.map(x => x.id).join("|")}&`;
        const url = `http://localhost:9999/threads?${tsQuery}${userQuery}${tagsQuery}_page=${pageIdx}&_limit=${ITEM_PER_PAGE}&_sort=created&_order=desc`;
        fetch(url)
            .then((x) => {
                setTotalCount(x.headers.get("X-Total-Count"));
                return x.json();
            })
            .then((x) => setThreads(x));

        fetch("http://localhost:9999/tags")
            .then((x) => x.json())
            .then((x) => setTagDict(x));
    }, [pageIdx, searchParams]);

    const handleChangePageIdx = (e) => {
        setPageIdx(e.target.value);
    };

    const handleDeleteThread = (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch(`http://localhost:9999/threads/${id}`, {
            method: "DELETE",
            headers,
        }).then(x => {
            toast("Deleted successfully!");
            setThreads(threads.filter(x => x.id !== id));
        });
    }


    return (
        <DefaultLayout>
            <Container>
                <h1>Tổ Buôn <CupHot style={{fontSize:"30px", marginBottom:"8px"}}/></h1>
                <div className="tl-context-ctn">

                    {/* <Button variant="secondary" style={{ marginLeft: "auto" }}>
                        <Link to="/search" className="link-unstyled">
                            <Search />
                            Search
                        </Link>
                    </Button> */}
                    <Button variant="primary" style={{ marginLeft: "auto" }}>
                        <Link to="/thread/new" className="link-unstyled">
                            New Thread
                        </Link>
                    </Button>
                </div>
                <Row>
                    <Col md={4} className="mb-3">
                        <SearchThreads onSearch={e => setSearchParams(e)} />
                    </Col>
                    <Col md={8}>
                        <ListGroup>
                            {threads.map((x) => (
                                <ThreadListItem key={x.id} thread={x} handleDelete={handleDeleteThread}/>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    );
}
