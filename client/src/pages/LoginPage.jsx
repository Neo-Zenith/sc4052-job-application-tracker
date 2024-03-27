import LoginForm from "../components/forms/LoginForm";
import AuthPageController from "../controller/AuthPageController";
import backdrop from "../img/backdrop.jpg";

function LoginPage() {
    const authPageController = new AuthPageController();
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
