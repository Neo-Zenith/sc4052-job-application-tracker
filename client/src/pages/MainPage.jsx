import { useEffect, useState } from "react";
import MainPageController from "../controller/MainPageController";
import PastXDaysChart from "../sections/Charts/PastXDaysChart";
import OverviewCards from "../sections/OverviewCards/OverviewCards";
import Sidebar from "../sections/Sidebar/Sidebar";
import "./Page.css";
import PieChart from "../sections/Charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import RecentAppTable from "../sections/Tables/RecentAppTable";
import ApplicationPageController from "../controller/ApplicationPageController";
import ResumeListPageController from "../controller/ResumeListPageController";

function MainPage() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.accessToken);
    const userId = useSelector((state) => state.userId);
    const [past7DaysData, setPast7DaysData] = useState([]);
    const [xValues, setXValues] = useState([]);
    const [statusCount, setStatusCount] = useState([]);
    const [latest5Applications, setLatest5Applications] = useState([]);
    const [highestResumeScore, setHighestResumeScore] = useState(null);
    const [totalApplications, setTotalApplications] = useState(0);
    const [hitBackRatio, setHitBackRatio] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    const mainPageController = new MainPageController(dispatch);
    const applicationPageController = new ApplicationPageController();
    const resumeListPageController = new ResumeListPageController();

    useEffect(() => {
        if (accessToken === "") {
            window.location.href = "/login";
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            const past7DaysApplicationsCount =
                await mainPageController.getPast7DaysApplicationsCount(
                    accessToken
                );
            setPast7DaysData(() => [
                {
                    name: "Applications Count",
                    data: past7DaysApplicationsCount.data
                        .map((data) => data.count)
                        .reverse(),
                },
            ]);
            setXValues(() =>
                past7DaysApplicationsCount.data
                    .map((data) => data.date)
                    .reverse()
            );

            const applications =
                await applicationPageController.getApplications(
                    userId,
                    accessToken
                );

            setTotalApplications(applications.length);

            // Group applications by status and count them
            const statusCount = applications.reduce((acc, application) => {
                if (acc[application.status]) {
                    acc[application.status]++;
                } else {
                    acc[application.status] = 1;
                }
                return acc;
            }, {});

            const getStatusColor = (status) => {
                switch (status) {
                    case "INTERVIEW":
                        return "#cc66ff";
                    case "ASSESSMENT":
                        return "#ff9900";
                    case "OFFERED":
                        return "#a688fa";
                    case "REJECTED":
                        return "#ff0000";
                    case "APPLIED":
                        return "#0066ff";
                    default:
                        return "#000000";
                }
            };
            // Convert statusCount object to an array of objects
            const statusCountArray = Object.keys(statusCount).map((key) => ({
                label: key.slice(0, 1) + key.slice(1).toLowerCase(),
                value: statusCount[key],
                color: getStatusColor(key),
            }));
            setStatusCount(statusCountArray);

            // Get the latest 5 applications
            const latest5Applications = applications
                .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                .slice(0, 5);
            setLatest5Applications(latest5Applications);

            // Get the latest resume score
            const resumes = await resumeListPageController.getResumes(
                userId,
                accessToken
            );
            const highestResumeScore = resumes.reduce(
                (latestScore, currentResume) => {
                    return currentResume.score > latestScore.score
                        ? currentResume
                        : latestScore;
                },
                resumes[0]
            );
            setHighestResumeScore(
                highestResumeScore ? highestResumeScore.score : null
            );

            // Calculate hit back ratio
            // Hit back ratio = (application with status not "APPLIED" or "GHOSTED" / total applications) * 100
            const hitBackRatio =
                (applications.filter(
                    (application) =>
                        application.status !== "APPLIED" &&
                        application.status !== "GHOSTED"
                ).length /
                    applications.length) *
                100;

            setHitBackRatio(hitBackRatio.toFixed(2));
            setDataLoaded(true);
        };
        fetchData();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <OverviewCards
                    highestResumeScore={highestResumeScore}
                    totalApplications={totalApplications}
                    hitBackRatio={hitBackRatio}
                />
                <PastXDaysChart
                    id="main-page-past-7-days-chart"
                    title={"Past 7 Days Applications Count"}
                    data={past7DaysData}
                    xValues={xValues}
                />
                <div
                    style={{
                        display: "flex",
                        width: "92.5%",
                        margin: "auto",
                        marginBottom: "5rem",
                    }}
                >
                    <PieChart
                        title={"Application by Status"}
                        data={statusCount}
                    />
                    <RecentAppTable
                        data={latest5Applications}
                        dataLoaded={dataLoaded}
                    />
                </div>
            </div>
        </>
    );
}

export default MainPage;
