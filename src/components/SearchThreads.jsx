import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const SearchThreads = ({onSearch}) => {
    const nav = useNavigate();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTag] = useState([]);
    const [chosenTag, setChosenTag] = useState(1);

    const [search, setSearch] = useState("");
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState(-1);

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
        fetch("http://localhost:9999/users")
            .then((x) => x.json())
            .then((x) => setAuthors(x));
    }, []);

    const handleAddTag = () => {
        const newTag = tags.find((x) => x.id === chosenTag);
        if (newTag) {
            setSelectedTag([...selectedTags, newTag]);
        }
    };

    const handleRemoveTag = (e) => {
        setSelectedTag(selectedTags.filter((x) => x.id !== e));
    };

    const handleSearch = (e) => {
        onSearch && onSearch({
            query: search,
            author,
            tags: selectedTags
        });
    };

    return (
        <Card className="" style={{textAlign:'center'}}>
            <Card.Header>
                <Card.Title>Search thread</Card.Title>
            </Card.Header>
            <Card.Body>
                <div>
                    <Form.Label>Thread title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter thread title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Form.Label>Author: </Form.Label>
                    <Form.Select value={author} onChange={e => setAuthor(parseInt(e.target.value))}>
                        <option value="-1">All</option>
                        {authors.map((x) => (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        ))}
                    </Form.Select>
                    <div>
                    <Form.Label>Thread tag: </Form.Label>
                    <Form.Select value={chosenTag} onChange={(e) => setChosenTag(parseInt(e.target.value))}>
                        {tags.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.topic}
                            </option>
                        ))}
                    </Form.Select>
                    </div>
                    <Button type="submit" className="my-2" onClick={handleAddTag}>
                        Add tag
                    </Button>
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
                </div>
            </Card.Body>
            <Card.Footer>
                <Button type="submit" className="my-2" onClick={handleSearch}>
                    Search
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default SearchThreads;
