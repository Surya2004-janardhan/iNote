import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    async function onSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "content-Type": "application/JSON",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        setCredentials({
            email: "",
            password: ""
        });
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    }

    return (
        <div>
            <section className="w-100 p-4 d-flex justify-content-center pb-4">
                <form
                    style={{ width: "25rem", padding: "3rem" }}
                    className="border rounded-5"
                    onSubmit={onSubmit}
                >
                    <div
                        className="form-outline mb-4"
                        data-mdb-input-init=""
                        data-mdb-input-initialized="true"
                    >
                        <label
                            className="form-label"
                            htmlFor="email"
                            style={{ marginLeft: "0px" }}
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={handleChange}
                            value={credentials.email}
                        />
                        <div className="form-notch">
                            <div
                                className="form-notch-leading"
                                style={{ width: "9px" }}
                            ></div>
                            <div
                                className="form-notch-middle"
                                style={{ width: "88.8px" }}
                            ></div>
                            <div className="form-notch-trailing"></div>
                        </div>
                    </div>

                    <div
                        className="form-outline mb-4"
                        data-mdb-input-init=""
                        data-mdb-input-initialized="true"
                    >
                        <label
                            className="form-label"
                            htmlFor="password"
                            style={{ marginLeft: "0px" }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="form-control"
                            onChange={handleChange}
                            value={credentials.password}
                        />
                        <div className="form-notch">
                            <div
                                className="form-notch-leading"
                                style={{ width: "9px" }}
                            ></div>
                            <div
                                className="form-notch-middle"
                                style={{ width: "64px" }}
                            ></div>
                            <div className="form-notch-trailing"></div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="form2Example31"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="form2Example31"
                                >
                                    {" "}
                                    Remember me{" "}
                                </label>
                            </div>
                        </div>

                        <div className="col">
                            <Link to="#">Forgot password?</Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-primary btn-block mb-4"
                        data-mdb-button-initialized="true"
                    >
                        Sign in
                    </button>

                    <div className="text-center">
                        <p>
                            Not a member? <Link to="/signup">Register</Link>
                        </p>
                        <p>or sign up with:</p>
                        <button
                            type="button"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-link btn-floating mx-1"
                            data-mdb-button-initialized="true"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button
                            type="button"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-link btn-floating mx-1"
                            data-mdb-button-initialized="true"
                        >
                            <i className="fab fa-google"></i>
                        </button>

                        <button
                            type="button"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-link btn-floating mx-1"
                            data-mdb-button-initialized="true"
                        >
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button
                            type="button"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-link btn-floating mx-1"
                            data-mdb-button-initialized="true"
                        >
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;
