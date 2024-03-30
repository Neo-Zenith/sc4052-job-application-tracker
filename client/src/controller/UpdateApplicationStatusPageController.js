import toast from "react-hot-toast";
import { serverUrl } from "../App";

class UpdateApplicationStatusPageController {
    updateAppStatus = async (appId, accessToken, application) => {
        const url = serverUrl + "/applications/" + appId;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(application),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.status === 200) {
                toast.success("Application status updated successfully");
                setTimeout(() => {
                    window.location.href = "/applications";
                }, 1000);
            }
            return data;
        } catch (error) {
            console.error("Error updating application status: ", error);
            throw error;
        }
    };
}

export default UpdateApplicationStatusPageController;
