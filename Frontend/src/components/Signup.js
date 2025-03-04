import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    async function onSubmit(e) {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            });
            const json = await response.json();
            console.log(json);
            setCredentials({
                name: "",
                email: "",
                password: "",
                cpassword: "",
            });
            if (json.success) {
                localStorage.setItem("token", json.authToken);
                navigate("/");
                props.showAlert("Account Created Succesfully", "success");
            } else {
                props.showAlert("User with this email or name already exists", "danger")
            }
        }
        else {
            props.showAlert("please confirm the password correctly","danger")
        }
    }

    function isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
            <section className="w-100 p-2 d-flex justify-content-center pb-2">
                <form
                    style={{ width: "25rem", padding: "1rem 3rem" }}
                    className="border rounded-5"
                    onSubmit={onSubmit}
                >
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name" style={{ marginLeft: "0px" }}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="form-control"
                            onChange={handleChange}
                            value={credentials.name}
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email" style={{ marginLeft: "0px" }}>
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
                            required
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password" style={{ marginLeft: "0px" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={handleChange}
                            value={credentials.password}
                            required
                            minLength={5}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="cpassword" style={{ marginLeft: "0px" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            placeholder="Confirm Password"
                            className="form-control"
                            onChange={handleChange}
                            value={credentials.cpassword}
                            required
                            minLength={5}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4" disabled = {credentials.name.length < 3 || !isEmail(credentials.email)}>
                        Sign Up
                    </button>

                    <div className="text-center">
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Signup;