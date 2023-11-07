import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const TagBadge = ({tag}) => {
    return (
        <Badge bg="secondary" className="m-1">
            <Link key={tag.id} to={`/tag`} title={tag.description}>
                <span style={{color: 'white'}}>{tag.topic}</span>
            </Link>
        </Badge>
    );
}
 
export default TagBadge;