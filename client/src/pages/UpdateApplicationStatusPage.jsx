import { useSelector } from "react-redux";
import ApplicationPageController from "../controller/ApplicationPageController";
import Sidebar from "../sections/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import StandardButton from "../components/buttons/StandardButton";

export default function UpdateApplicationStatusPage() {
    const userId = useSelector((state) => state.userId);
    const accessToken = useSelector((state) => state.accessToken);
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState(null);

    const applicationPageController = new ApplicationPageController();

    useEffect(() => {
        const fetchApplications = async () => {
            const applications =
                await applicationPageController.getApplications(
                    userId,
                    accessToken
                );
            console.log(applications);
            setApplications(applications);
        };

        fetchApplications();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <div
                    style={{
                        display: "flex",
                        borderRadius: "1.5rem",
                        flexDirection: "column",
                        backgroundColor: "#282828",
                        padding: "5rem 5rem",
                        margin: "0rem 2rem",
                        marginTop: "15rem",
                    }}
                >
                    <span className="applications-table-title">
                        Update Application Status
                    </span>
                    <div
                        style={{
                            width: "100%",
                            marginLeft: "-2rem",
                            marginTop: "1.5rem",
                        }}
                    >
                        <select
                            style={{
                                cursor: "pointer",
                                backgroundColor: "transparent",
                                color: "white",
                                font: "400 1.2rem Inter",
                                border: "1px solid #ba9ffb",
                                borderRadius: "5px",
                                padding: "1rem 1.5rem",
                                width: "100%",
                            }}
                            defaultValue={"Select Application"}
                            onChange={(e) => {
                                if (e.target.value === "default") {
                                    setSelectedApplication(null);
                                    return;
                                }
                                setSelectedApplication(e.target.value);
                            }}
                        >
                            <option key={"default"} value={"default"}>
                                Select Application
                            </option>
                            {applications.map((app) => {
                                return (
                                    <option key={app.id} value={app.id}>
                                        ID {app.id}: {app.jobTitle} (
                                        {app.companyName})
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {selectedApplication && (
                        <div
                            style={{
                                display: "flex",
                                columnGap: "1.5rem",
                                marginLeft: "-2rem",
                                alignItems: "center",
                                width: "100%",
                                marginTop: "2.5rem",
                            }}
                        >
                            <span
                                style={{
                                    font: "400 1.4rem Inter",
                                    width: "15rem",
                                    color: "white",
                                }}
                            >
                                Select New Status:
                            </span>
                            <select
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    font: "400 1.2rem Inter",
                                    border: "1px solid #ba9ffb",
                                    borderRadius: "5px",
                                    padding: "1rem 1.5rem",
                                    width: "100%",
                                }}
                                defaultValue={"Select Status"}
                                onChange={(e) => {
                                    if (e.target.value === "default") {
                                        setUpdatedStatus(null);
                                        return;
                                    }
                                    setUpdatedStatus(e.target.value);
                                }}
                            >
                                <option key={"default"} value={"default"}>
                                    Select Status
                                </option>
                                <option key={"Applied"} value={"APPLIED"}>
                                    Applied
                                </option>
                                <option key={"Assessment"} value={"ASSESSMENT"}>
                                    Assessment
                                </option>
                                <option key={"Interview"} value={"INTERVIEW"}>
                                    Interview
                                </option>
                                <option key={"Offered"} value={"OFFERED"}>
                                    Offered
                                </option>
                                <option key={"Rejected"} value={"REJECTED"}>
                                    Rejected
                                </option>
                            </select>
                        </div>
                    )}
                    {selectedApplication && updatedStatus && (
                        <div
                            style={{
                                marginTop: "3rem",
                                marginLeft: "auto",
                                marginRight: "2rem",
                            }}
                        >
                            <StandardButton
                                display={
                                    <span style={{ font: "400 1.4rem Inter" }}>
                                        Submit
                                    </span>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
