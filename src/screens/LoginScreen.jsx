import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
    return (
        <div>
            <button onClick={e => toast("Hello")}>Notify!</button>
            <ToastContainer />
        </div>
    );
}
 
export default LoginScreen;