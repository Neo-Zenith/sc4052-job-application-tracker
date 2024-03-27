import "./Sidebar.css";
import WorkIcon from "@mui/icons-material/Work";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BadgeIcon from "@mui/icons-material/Badge";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDispatch } from "react-redux";
import AuthPageController from "../../controller/AuthPageController";

function Sidebar() {
    const dispatch = useDispatch();
    const authPageController = new AuthPageController(dispatch);

    const handleLogout = () => {
        authPageController.logout();
    };

    return (
        <div className="sidebar">
            <div className="sidebar__title">
                <span>Dashboard</span>
            </div>
            <div className="sidebar__menu">
                <a className="sidebar__link home__link" href="/">
                    <OpenInNewIcon />
                    Home
                </a>
                <div className="sidebar__section">
                    <span className="sidebar__section__header">Statistics</span>
                    <a className="sidebar__link" href="/">
                        <WorkIcon />
                        View Job Applications
                    </a>
                    <a className="sidebar__link" href="/">
                        <BadgeIcon />
                        View Employers
                    </a>
                </div>
                <div className="sidebar__section">
                    <span className="sidebar__section__header">Actions</span>
                    <a className="sidebar__link" href="/">
                        <AutorenewIcon />
                        Update Status
                    </a>
                </div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
