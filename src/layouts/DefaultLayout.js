import Footer from "../components/Footer";
import Header from "../components/Header";
import img from "../img/back2.jpg";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div style={{ paddingBottom: "100px" }}>{children}</div>
            <div style={{ backgroundImage: `url(${img})` }}></div>
            <Footer />
        </div>
    );
}
