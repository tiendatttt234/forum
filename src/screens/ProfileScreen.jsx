import { Container, Row } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import RoleAssignment from "../components/RoleAssignment";
import { useUser } from "../hooks/useUser";
import { useParams } from "react-router-dom";
const ProfileScreen = () => {
    const [user] = useUser();
    const { profileId } = useParams();

    return (
        <DefaultLayout>
            <Container>
                <EditProfile />
                {(user?.id == profileId || user?.role >= 2) && <ChangePassword />}
                {user?.role === 3 && <RoleAssignment />}
            </Container>
        </DefaultLayout>
    );
};

export default ProfileScreen;
