import { useLocation } from "react-router-dom";
import Sidebar from "../sections/Sidebar/Sidebar";
import { useState } from "react";
import ResumeScorePageController from "../controller/ResumeScorePageController";
import { useSelector } from "react-redux";
import ApplicationPageController from "../controller/ApplicationPageController";
import { ClipLoader } from "react-spinners";

export default function ResumeScorePage() {
    const location = useLocation();
    const resumeId = location.pathname.split("/").pop();
    const accessToken = useSelector((state) => state.accessToken);

    const [resume, setResume] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [score, setScore] = useState(0);
    const [jobDescription, setJobDescription] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

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
            setFeedbacks(
                resumeScore.feedback.split("<>").map((feedback) => {
                    return feedback.replace("/^(s?Feedbacksds)/", "");
                })
            );

            if (resumeScore.applicationId) {
                fetchJobDescription(resumeScore.applicationId);
            } else {
                setJobDescription(resumeScore.jobDescription);
                setDataLoaded(true);
            }
        };

        const fetchJobDescription = async (applicationId) => {
            const application = await applicationPageController.getApplication(
                applicationId,
                accessToken
            );
            setJobDescription(application.jobDescription);
            setDataLoaded(true);
        };

        fetchResume();
        fetchResumeScore();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <div
                    style={{
                        marginTop: "5rem",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "2rem",
                        padding: "5rem",
                    }}
                >
                    <div style={{ flex: 0.3, position: "relative" }}>
                        {resume && (
                            <iframe
                                src={resume + "#zoom=page-width&#toolbar=0"}
                                width="500"
                                height="700"
                            />
                        )}
                        {!resume && (
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ClipLoader color="white" />
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            flex: 0.7,
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "2rem",
                            paddingLeft: "4rem",
                            position: "relative",
                        }}
                    >
                        {!dataLoaded && (
                            <div
                                style={{
                                    display: "flex",
                                    zIndex: 1,
                                    position: "absolute",
                                    backgroundColor: "transparent",
                                    width: "100%",
                                    height: "100%",
                                }}
                            ></div>
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#282828",
                                padding: "2rem 3rem",
                                borderRadius: "1.5rem",
                                rowGap: "1.5rem",
                                filter: dataLoaded
                                    ? "blur(0)"
                                    : "blur(5px) brightness(0.7)",
                            }}
                        >
                            <span className="resume-score-title">
                                Resume Score
                            </span>
                            <div>
                                {dataLoaded && (
                                    <>
                                        <span className="resume-score">
                                            {score}
                                        </span>
                                        <span className="resume-score-scale">
                                            /100
                                        </span>
                                    </>
                                )}
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
                                filter: dataLoaded
                                    ? "blur(0)"
                                    : "blur(5px) brightness(0.7)",
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
                                filter: dataLoaded
                                    ? "blur(0)"
                                    : "blur(5px) brightness(0.7)",
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
            </div>
        </>
    );
}
