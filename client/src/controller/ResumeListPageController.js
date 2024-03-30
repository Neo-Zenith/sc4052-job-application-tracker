import { serverUrl } from "../App";

class ResumeListPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    async getResumes(userId, accessToken) {
        const url = serverUrl + `/resumes?userId=${userId}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting resumes:", error);
            throw error;
        }
    }
}

export default ResumeListPageController;
