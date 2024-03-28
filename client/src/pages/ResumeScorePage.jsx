import Sidebar from "../sections/Sidebar/Sidebar";
import resume from "../Resume-Lee Juin.pdf";
import { useState } from "react";

export default function ResumeScorePage() {
    const [feedbacks, setFeedbacks] = useState([
        "Feedback 1",
        "Feedback 2",
        "Super long feedback that is super long and very long to test the wrapping of the text in the feedback box, longer text to test overflow feedback generated by ChatGPT",
    ]);
    const [score, setScore] = useState(7);

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
                    <div style={{ flex: 0.3 }}>
                        <iframe
                            src={resume + "#zoom=page-width&#toolbar=0"}
                            width="500"
                            height="700"
                            frameborder="0"
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
                                <span className="resume-score">{score}</span>
                                <span className="resume-score-scale">/100</span>
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
                                    value={
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing"
                                    }
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
                                    rowGap: "1rem",
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
                                                rowGap: "1rem",
                                                flexWrap: "wrap",
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
                                                        flex: 0.05,
                                                    }}
                                                >
                                                    {index + 1}
                                                </span>
                                                <span style={{ flex: 0.95 }}>
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