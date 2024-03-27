import SignupForm from "../components/forms/SignupForm";
import AuthPageController from "../controller/AuthPageController";
import backdrop from "../img/backdrop.jpg";

function SignupPage() {
    return (
        <div className="auth-page-wrapper">
            <div className="auth-bg">
                <img src={backdrop} />
            </div>
            <div className="auth-content">
                <SignupForm onSubmit={AuthPageController.signup} />
            </div>
        </div>
    );
}

export default SignupPage;
