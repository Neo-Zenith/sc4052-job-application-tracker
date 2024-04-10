import SignupForm from "../components/forms/SignupForm";
import AuthPageController from "../controller/AuthPageController";
import backdrop from "../img/backdrop.jpg";

function SignupPage() {
    const authPageController = new AuthPageController();

    return (
        <div className="auth-page-wrapper">
            <div className="auth-bg">
                <img src={backdrop} />
            </div>
            <div className="auth-content">
                <SignupForm onSubmit={authPageController.signup} />
            </div>
        </div>
    );
}

export default SignupPage;
