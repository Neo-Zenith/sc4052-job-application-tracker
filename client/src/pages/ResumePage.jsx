import { TextField } from "@mui/material";
import Sidebar from "../sections/Sidebar/Sidebar";
import StandardButton from "../components/buttons/StandardButton";
import { useEffect, useState } from "react";
import Selection from "../sections/Selection/Selection";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function ResumePage() {
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
                                        display={<span>Submit</span>}
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

export default ResumePage;
