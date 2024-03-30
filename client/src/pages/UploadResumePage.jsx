import { TextField } from "@mui/material";
import Sidebar from "../sections/Sidebar/Sidebar";
import StandardButton from "../components/buttons/StandardButton";
import { useEffect, useState } from "react";
import Selection from "../sections/Selection/Selection";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadResumePageController from "../controller/UploadResumePageController";
import { useDispatch, useSelector } from "react-redux";
import ApplicationPageController from "../controller/ApplicationPageController";

function UploadResumePage() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const accessToken = useSelector((state) => state.accessToken);
    const [file, setFile] = useState(null);
    const [configChoice, setConfigChoice] = useState("new");
    const [applications, setApplications] = useState([
        {
            id: 1,
            title: "Software Engineer",
            company: "Google",
            jobDescription: "This is a job description",
        },
    ]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [jobDescription, setJobDescription] = useState("");

    const uploadResumePageController = new UploadResumePageController(dispatch);
    const applicationPageController = new ApplicationPageController(dispatch);

    const handleSubmitResume = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await uploadResumePageController.uploadResume(
                formData,
                accessToken
            );
            return response;
        } catch (error) {
            console.error("Error uploading resume:", error);
        }
    };

    const handleReqForFeedback = async (resumeId) => {
        const payload = {
            resumeInfoId: resumeId,
            jobDescription: jobDescription ? jobDescription : undefined,
            applicationId: selectedApplication
                ? parseInt(selectedApplication)
                : undefined,
        };

        try {
            const response = await uploadResumePageController.requestFeedback(
                payload,
                accessToken
            );
            return response;
        } catch (error) {
            console.error("Error requesting feedback:", error);
        }
    };

    const handleSubmit = async () => {
        const response = await handleSubmitResume();
        if (response) {
            await handleReqForFeedback(response.data.id);
        }
    };

    useEffect(() => {
        setSelectedApplication(null);
        setJobDescription("");
    }, [configChoice]);

    useEffect(() => {
        const targetApp = applications.find(
            (app) => app.id === parseInt(selectedApplication)
        );
        if (!targetApp) {
            return;
        }
        const updatedJD = targetApp.jobDescription;
        setJobDescription(updatedJD);
    }, [selectedApplication]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await applicationPageController.getApplications(
                userId,
                accessToken
            );
            setApplications(
                data.map((app) => {
                    return {
                        id: app.id,
                        title: app.jobTitle,
                        company: app.companyName,
                        jobDescription: app.jobDescription,
                    };
                })
            );
        };
        if (configChoice === "existing") {
            fetchData();
        }
    }, [configChoice]);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5rem",
                        rowGap: "2rem",
                        marginTop: "5rem",
                    }}
                >
                    <div className="resume-page-section">
                        <div className="resume-page-section-content">
                            <span>Step 1: Upload Your Resume</span>
                            <form>
                                <TextField
                                    type="file"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            color: "#c1bfbf",
                                            "& fieldset": {
                                                borderColor: "#c1bfbf",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#ba9ffb",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#ba9ffb",
                                            },
                                        },
                                    }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="resume-page-section">
                        <div
                            className={
                                "resume-page-mask" + (file ? " disabled" : "")
                            }
                        >
                            <FileUploadIcon />
                            <span>Please Upload Resume First.</span>
                        </div>
                        <div
                            className={
                                "resume-page-section-content" +
                                (file ? "" : " disabled")
                            }
                        >
                            <span>Step 2: Job Description Details</span>
                            <Selection
                                onChange={(val) => {
                                    setConfigChoice(val);
                                }}
                            />
                            {configChoice === "new" && (
                                <div>
                                    <textarea
                                        className="resume-page-textarea"
                                        placeholder="Enter the job description here:"
                                        onChange={(e) =>
                                            setJobDescription(e.target.value)
                                        }
                                    />
                                </div>
                            )}
                            {configChoice === "existing" && (
                                <div>
                                    <select
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            color: "white",
                                            font: "400 1.2rem Inter",
                                            border: "1px solid #ba9ffb",
                                            borderRadius: "5px",
                                            padding: "1rem 1.5rem",
                                        }}
                                        defaultValue={"Select Application"}
                                        onChange={(e) => {
                                            if (e.target.value === "default") {
                                                setSelectedApplication(null);
                                                return;
                                            }
                                            setSelectedApplication(
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option
                                            key={"default"}
                                            value={"default"}
                                        >
                                            Select Application
                                        </option>
                                        {applications.map((app) => {
                                            return (
                                                <option
                                                    key={app.id}
                                                    value={app.id}
                                                >
                                                    ID {app.id}: {app.title} (
                                                    {app.company})
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {selectedApplication && jobDescription && (
                                        <div style={{ marginTop: "1rem" }}>
                                            <textarea
                                                className="resume-page-textarea"
                                                placeholder="Enter the job description here:"
                                                disabled={true}
                                                value={jobDescription}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            {file && jobDescription && (
                                <div style={{ marginLeft: "auto" }}>
                                    <StandardButton
                                        onClick={handleSubmit}
                                        display={<span>Submit</span>}
                                        useLoader={true}
                                        loaderEnd={false}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadResumePage;
