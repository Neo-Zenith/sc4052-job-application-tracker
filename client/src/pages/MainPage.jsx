import { useEffect, useState } from "react";
import MainPageController from "../controller/MainPageController";
import PastXDaysChart from "../sections/Charts/PastXDaysChart";
import OverviewCards from "../sections/OverviewCards/OverviewCards";
import Sidebar from "../sections/Sidebar/Sidebar";
import "./Page.css";

function MainPage() {
    const mainPageController = new MainPageController();
    const [past7DaysData, setPast7DaysData] = useState([]);

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
            </div>
        </>
    );
}

export default MainPage;
