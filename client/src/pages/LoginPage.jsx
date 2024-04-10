import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/forms/LoginForm";
import AuthPageController from "../controller/AuthPageController";
import backdrop from "../img/backdrop.jpg";
import { useEffect } from "react";

function LoginPage() {
    const accessToken = useSelector((state) => state.accessToken);
    const dispatch = useDispatch();
    const authPageController = new AuthPageController(dispatch);

    useEffect(() => {
        if (accessToken) {
            window.location.href = "/";
        }
    }, [accessToken]);

    return (
        <div className="auth-page-wrapper">
            <div className="auth-bg">
                <img src={backdrop} />
            </div>
            <div className="auth-content">
                <LoginForm onSubmit={authPageController.login} />
            </div>
        </div>
    );
}

export default LoginPage;
