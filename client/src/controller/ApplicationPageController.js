import { serverUrl } from "../App";

class ApplicationPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    filter = (filterOptions, data) => {
        const { status } = filterOptions;
        if (Object.keys(filterOptions).length === 0) {
            return data;
        }
        if (status === "All") {
            return data;
        }
        return data.filter((item) => item.status === status);
    };

    getApplications = async (userId, accessToken) => {
        const url = serverUrl + "/applications?userId=" + userId;

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
            console.error("ApplicationPageController.getApplications: ", error);
        }
    };

    getApplication = async (applicationId, accessToken) => {
        const url = serverUrl + "/applications/" + applicationId;

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
            console.error("ApplicationPageController.getApplication: ", error);
        }
    }
}

export default ApplicationPageController;
