import toast from "react-hot-toast";
import { serverUrl } from "../App";

class UploadResumePageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    uploadResume = async (formData, accessToken) => {
        const url = serverUrl + "/resumes";
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error uploading resume:", error);
            throw error;
        }
    };

    requestFeedback = async (payload, accessToken) => {
        const url = serverUrl + `/gemini/resume`;
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.status === 200) {
                console.log(data);
                toast.success("Resume submitted for feedback!");
                setTimeout(() => {
                    window.location.href = `/resume/${payload.resumeInfoId}`;
                }, 1000);
            }
            return data;
        } catch (error) {
            console.error("Error requesting feedback:", error);
            throw error;
        }
    };
}

export default UploadResumePageController;
