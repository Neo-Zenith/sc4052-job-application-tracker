import SignupForm from "../components/forms/SignupForm";
import AuthPageController from "../controller/AuthPageController";
import backdrop from "../img/backdrop.jpg";

function SignupPage() {
    const signupPageController = new AuthPageController();
    return (
        <div className="auth-page-wrapper">
            <div className="auth-bg">
                <img src={backdrop} />
            </div>
            <div className="auth-content">
                <SignupForm onSubmit={signupPageController.signup} />
            </div>
        </div>
    );
}

export default SignupPage;
