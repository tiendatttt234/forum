import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [account, accountchange] = useState("");
    const [dob, dobchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [gmail, gmailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("male");
    const [role, rolechange] = useState("0");
    const navigate = useNavigate();

    const IsValaccountate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if (account === null || account === "") {
            isproceed = false;
            errormessage += " Username,";
        }
        if (name === null || name === "") {
            isproceed = false;
            errormessage += " Fullname,";
        }
        if (password === null || password === "") {
            isproceed = false;
            errormessage += " Password,";
        }
        if (gmail === null || gmail === "") {
            isproceed = false;
            errormessage += " Email,";
        }
        if (dob === null || dob === "") {
            isproceed = false;
            errormessage += " Date of birth,";
        }
        if (phone === null || phone === "") {
            isproceed = false;
            errormessage += " Phone ";
        }
        if (role === null || role === "") {
            isproceed = false;
            errormessage += " Role ";
        }

        if (!isproceed) {
            toast(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(gmail)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid Email");
            }
        }
        return isproceed;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { account, name, password, gmail, phone, country, address, gender, dob, role };
        if (IsValaccountate()) {
            fetch("http://localhost:9999/users", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(regobj),
            })
                .then((res) => {
                    toast.success("Registered successfully.");
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error("Failed :" + err.message);
                });
        }
    };
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            User Name <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={account}
                                            onChange={(e) => accountchange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Password <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={password}
                                            onChange={(e) => passwordchange(e.target.value)}
                                            type="password"
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Full Name <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={name}
                                            onChange={(e) => namechange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Gmail <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={gmail}
                                            onChange={(e) => gmailchange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Phone <span className="errmsg"></span>
                                        </label>
                                        <input
                                            value={phone}
                                            onChange={(e) => phonechange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Role <span className="errmsg"></span>
                                        </label>
                                        <input
                                            value={role}
                                            onChange={(e) => rolechange(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Country <span className="errmsg">*</span>
                                        </label>
                                        <select
                                            value={country}
                                            onChange={(e) => countrychange(e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="vietnam">VietNam</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => addresschange(e.target.value)}
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Date of birth <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={dob}
                                            onChange={(e) => dobchange(e.target.value)}
                                            type="date"
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input
                                            type="radio"
                                            checked={gender === "male"}
                                            onChange={(e) => genderchange(e.target.value)}
                                            name="gender"
                                            value="male"
                                            className="app-check"
                                        ></input>
                                        <label>Male</label>
                                        <input
                                            type="radio"
                                            checked={gender === "female"}
                                            onChange={(e) => genderchange(e.target.value)}
                                            name="gender"
                                            value="female"
                                            className="app-check"
                                        ></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>{" "}
                            |
                            <Link to={"/login"} className="btn btn-danger">
                                Close
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register;
