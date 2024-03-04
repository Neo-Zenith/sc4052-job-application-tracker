import OverviewCards from "../sections/OverviewCards/OverviewCards";
import Sidebar from "../sections/Sidebar/Sidebar";
import "./Page.css";

function MainPage() {
    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <OverviewCards />
            </div>
        </>
    );
}

export default MainPage;
