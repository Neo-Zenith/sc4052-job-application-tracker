import { useEffect, useState } from "react";
import MainPageController from "../controller/MainPageController";
import PastXDaysChart from "../sections/Charts/PastXDaysChart";
import OverviewCards from "../sections/OverviewCards/OverviewCards";
import Sidebar from "../sections/Sidebar/Sidebar";
import "./Page.css";
import PieChart from "../sections/Charts/PieChart";
import { useDispatch } from "react-redux";

function MainPage() {
    const dispatch = useDispatch();
    const [past7DaysData, setPast7DaysData] = useState([]);
    const mainPageController = new MainPageController(dispatch);

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
            </div>
        </>
    );
}

export default MainPage;
