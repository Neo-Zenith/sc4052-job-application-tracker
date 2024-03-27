import { useState } from "react";
import StandardButton from "../buttons/StandardButton";

function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        const data = onSubmit({ username, password });
        console.log(data);
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
        if (!password) {
            document.getElementById("password-label").classList.add("error");
            document.getElementById("password").classList.add("error");
            errorCount++;
        }

        return errorCount === 0;
    };

    return (
        <>
            <div className="form-container">
                <div className="form-header">
                    <span className="form-title">Login</span>
                    <span className="form-subtitle">
                        Don't have an account? Signup <a href="/signup">here</a>
                        .
                    </span>
                </div>
                <div className="form-content">
                    <form>
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
                        <StandardButton
                            onClick={handleSubmit}
                            display={
                                <span className="form-btn-label">Login</span>
                            }
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
