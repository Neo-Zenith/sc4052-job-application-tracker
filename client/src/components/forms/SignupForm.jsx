import { useEffect, useState } from "react";
import "./Form.css";
import StandardButton from "../buttons/StandardButton";

function SignupForm({ onSubmit }) {
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        setLoaded(false);
        setTimeout(() => {
            if (!validateInputs()) {
                setLoaded(true);
                return;
            }
            onSubmit({ username, email, password, roles: "admin" });
            setLoaded(true);
        }, 1000);
    };

    const handleLabelState = (e) => {
        const label = document.getElementById(`${e.target.id}-label`);
        const input = document.getElementById(e.target.id);
        if (e.target.value === "") {
            label.classList.remove("active");
            input.classList.remove("active");
        } else {
            label.classList.add("active");
            input.classList.add("active");
        }
    };

    const validateInputs = () => {
        let errorCount = 0;

        if (!username) {
            document.getElementById("username-label").classList.add("error");
            document.getElementById("username").classList.add("error");
            errorCount++;
        }
        if (!email) {
            document.getElementById("email-label").classList.add("error");
            document.getElementById("email").classList.add("error");
            errorCount++;
        }
        if (!password) {
            document.getElementById("password-label").classList.add("error");
            document.getElementById("password").classList.add("error");
            errorCount++;
        }
        if (!confirmPassword) {
            document
                .getElementById("confirm-password-label")
                .classList.add("error");
            document.getElementById("confirm-password").classList.add("error");
            errorCount++;
        }

        return errorCount === 0;
    };

    useEffect(() => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                document
                    .getElementById("confirm-password-label")
                    .classList.remove("error");
                document
                    .getElementById("confirm-password")
                    .classList.remove("error");
            } else {
                document
                    .getElementById("confirm-password-label")
                    .classList.add("error");
                document
                    .getElementById("confirm-password")
                    .classList.add("error");
            }
        } else {
            document
                .getElementById("confirm-password-label")
                .classList.remove("error");
            document
                .getElementById("confirm-password")
                .classList.remove("error");
        }
    }, [password, confirmPassword]);

    return (
        <>
            <div className="form-container">
                <div className="form-header">
                    <span className="form-title">Sign Up</span>
                    <span className="form-subtitle">
                        Already have an account? Login <a href="/login">here</a>
                        .
                    </span>
                </div>
                <div className="form-content">
                    <div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    handleLabelState(e);
                                }}
                                required
                            />
                            <label id="username-label" htmlFor="username">
                                Username
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleLabelState(e);
                                }}
                                required
                            />
                            <label id="email-label" htmlFor="email">
                                Email
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    handleLabelState(e);
                                }}
                                required
                            />
                            <label id="password-label" htmlFor="password">
                                Password
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    handleLabelState(e);
                                }}
                                required
                            />
                            <label
                                id="confirm-password-label"
                                htmlFor="confirm-password-label"
                            >
                                Confirm Password
                            </label>
                            <span className="password-error-text">
                                Passwords do not match!
                            </span>
                        </div>
                        <StandardButton
                            onClick={handleSubmit}
                            display={
                                <span className="form-btn-label">Sign Up</span>
                            }
                            useLoader={true}
                            loaderEnd={loaded}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupForm;
