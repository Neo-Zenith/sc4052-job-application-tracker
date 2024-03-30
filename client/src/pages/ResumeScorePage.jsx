import { useLocation } from "react-router-dom";
import Sidebar from "../sections/Sidebar/Sidebar";
import { useState } from "react";
import ResumeScorePageController from "../controller/ResumeScorePageController";
import { useSelector } from "react-redux";
import ApplicationPageController from "../controller/ApplicationPageController";

export default function ResumeScorePage() {
    const location = useLocation();
    const resumeId = location.pathname.split("/").pop();
    const accessToken = useSelector((state) => state.accessToken);

    const [resume, setResume] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [score, setScore] = useState(0);
    const [jobDescription, setJobDescription] = useState("");

    const resumeScorePageController = new ResumeScorePageController();
    const applicationPageController = new ApplicationPageController();

    useState(() => {
        const fetchResume = async () => {
            const resumeBlob = await resumeScorePageController.getResumeFile(
                resumeId,
                accessToken
            );
            setResume(URL.createObjectURL(resumeBlob));
        };

        const fetchResumeScore = async () => {
            const resumeScore = await resumeScorePageController.getResumeScore(
                resumeId,
                accessToken
            );
            setScore(resumeScore.score);
            const modifiedFeedbacks = resumeScore.feedback
                .split("| ")
                .map((feedback) => {
                    return feedback.replace("/^(s?Feedbacksds)/", "");
                });
            setFeedbacks(modifiedFeedbacks);

            if (resumeScore.applicationId) {
                fetchJobDescription(resumeScore.applicationId);
            } else {
                setJobDescription(resumeScore.jobDescription);
            }
        };

        const fetchJobDescription = async (applicationId) => {
            const application = await applicationPageController.getApplication(
                applicationId,
                accessToken
            );
            setJobDescription(application.jobDescription);
        };

        fetchResume();
        fetchResumeScore();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                {resume && (
                    <div
                        style={{
                            marginTop: "5rem",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "2rem",
                            padding: "5rem",
                        }}
                    >
                        <div style={{ flex: 0.3 }}>
                            <iframe
                                src={resume + "#zoom=page-width&#toolbar=0"}
                                width="500"
                                height="700"
                            />
                        </div>
                        <div
                            style={{
                                flex: 0.7,
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "2rem",
                                paddingLeft: "4rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#282828",
                                    padding: "2rem 3rem",
                                    borderRadius: "1.5rem",
                                    rowGap: "1.5rem",
                                }}
                            >
                                <span className="resume-score-title">
                                    Resume Score
                                </span>
                                <div>
                                    <span className="resume-score">
                                        {score}
                                    </span>
                                    <span className="resume-score-scale">
                                        /100
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#282828",
                                    padding: "2rem 3rem",
                                    borderRadius: "1.5rem",
                                    rowGap: "1.5rem",
                                }}
                            >
                                <span className="resume-score-title">
                                    Job Description
                                </span>
                                <div style={{ marginTop: "1rem" }}>
                                    <textarea
                                        className="resume-page-textarea"
                                        disabled={true}
                                        style={{
                                            width: "100%",
                                            boxSizing: "border-box",
                                        }}
                                        value={jobDescription}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#282828",
                                    padding: "2rem 3rem",
                                    borderRadius: "1.5rem",
                                    rowGap: "1.5rem",
                                }}
                            >
                                <span className="resume-score-title">
                                    Feedbacks
                                </span>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: "1.5rem",
                                        marginTop: "1rem",
                                    }}
                                >
                                    {feedbacks.map((feedback, index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignContent: "flex-start",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#c1bfbf",
                                                        font: "400 1.3rem Inter",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "5rem",
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                    <span
                                                        style={{
                                                            flex: 0.95,
                                                        }}
                                                    >
                                                        {feedback}
                                                    </span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
