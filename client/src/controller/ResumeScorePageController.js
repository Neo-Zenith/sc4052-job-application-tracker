import { serverUrl } from "../App";

class ResumeScorePageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getResumeFile = async (resumeId, accessToken) => {
        const url = serverUrl + `/resumes/file/${resumeId}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await fetch(url, options);

            if (response.status === 200) {
                const blob = await response.blob();
                return blob;
            }
        } catch (error) {
            console.error("Error fetching PDF file:", error);
        }
    };

    getResumeScore = async (resumeId, accessToken) => {
        const url = serverUrl + `/resumes/${resumeId}`;

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("ResumeScorePageController.getResumeScore: ", error);
        }
    };
}

export default ResumeScorePageController;
