import { useEffect, useState } from "react";
import MainPageController from "../controller/MainPageController";
import PastXDaysChart from "../sections/Charts/PastXDaysChart";
import OverviewCards from "../sections/OverviewCards/OverviewCards";
import Sidebar from "../sections/Sidebar/Sidebar";
import "./Page.css";
import PieChart from "../sections/Charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import RecentAppTable from "../sections/Tables/RecentAppTable";

function MainPage() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.accessToken);
    const [past7DaysData, setPast7DaysData] = useState([]);
    const mainPageController = new MainPageController(dispatch);

    useEffect(() => {
        if (accessToken === "") {
            window.location.href = "/login";
        }
    }, [accessToken]);

    useEffect(() => {
        setPast7DaysData(() => [
            {
                name: "Applications Count",
                data: mainPageController.getPast7DaysApplicationsCount(),
            },
        ]);
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <OverviewCards />
                <PastXDaysChart
                    id="main-page-past-7-days-chart"
                    title={"Past 7 Days Applications Count"}
                    data={past7DaysData}
                    x={7}
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
                        data={[
                            {
                                label: "Pending",
                                value: 1200,
                                color: "#ff8c00",
                            },
                            {
                                label: "Approved",
                                value: 15,
                                color: "#a688fa",
                            },
                            {
                                label: "Rejected",
                                value: 5,
                                color: "#ff0000",
                            },
                        ]}
                    />
                    <RecentAppTable />
                </div>
            </div>
        </>
    );
}

export default MainPage;
