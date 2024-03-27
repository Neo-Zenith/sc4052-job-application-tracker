import { setAccessToken } from "../store/actions";
import toast from "react-hot-toast";

class AuthPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    signup = async (payload) => {
        const url = "http://172.171.242.107:8080/api/v1/auth/signup";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("SignupPageController.signup: ", error);
        }
    };

    login = async (payload) => {
        const url = "http://172.171.242.107:8080/api/v1/auth/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.status === 200) {
                toast.success("Login successful!");
                setTimeout(() => {
                    this.dispatch(setAccessToken(data.token));
                }, 1000);
            }
            return data;
        } catch (error) {
            console.error("SignupPageController.signup: ", error);
        }
    };

    logout = () => {
        toast.success("Logout successful!");
        setTimeout(() => {
            this.dispatch(setAccessToken(""));
        }, 1000);
    };
}

export default AuthPageController;
