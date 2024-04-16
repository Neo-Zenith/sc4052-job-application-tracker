import { serverUrl } from "../App";
import { setAccessToken, setUserId, setUsername } from "../store/actions";
import toast from "react-hot-toast";

class AuthPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    decodeToken = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(
                    (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
        );
        const payload = JSON.parse(jsonPayload);
        return payload;
    };

    signup = async (payload) => {
        const url = serverUrl + "/auth/signup";
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
            if (response.status !== 201) {
                toast.error(data.message);
            } else {
                toast.success("Signup successful!");
            }
            return data;
        } catch (error) {
            console.error("SignupPageController.signup: ", error);
        }
    };

    login = async (payload) => {
        const url = serverUrl + "/auth/login";
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
                const payload = this.decodeToken(data.token);
                setTimeout(() => {
                    this.dispatch(setUsername(payload.sub));
                    this.dispatch(setUserId(payload.userId));
                    this.dispatch(setAccessToken(data.token));
                }, 1000);
            } else if (response.status === 401) {
                toast.error("Invalid email or password!");
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
            this.dispatch(setUsername(""));
            this.dispatch(setUserId(-1));
        }, 1000);
    };
}

export default AuthPageController;
