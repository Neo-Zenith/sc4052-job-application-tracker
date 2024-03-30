import { serverUrl } from "../App";

class MainPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getPast7DaysApplicationsCount = async (accessToken) => {
        const url = serverUrl + "/applications/count/last7days";
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
            console.error(
                "Error getting past 7 days applications count:",
                error
            );
            throw error;
        }
    };
}

export default MainPageController;
