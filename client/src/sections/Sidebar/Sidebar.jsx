import "./Sidebar.css";
import WorkIcon from "@mui/icons-material/Work";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BadgeIcon from "@mui/icons-material/Badge";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDispatch } from "react-redux";
import AuthPageController from "../../controller/AuthPageController";
import LogoutIcon from "@mui/icons-material/Logout";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import StandardButton from "../../components/buttons/StandardButton";

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
                    <span className="sidebar__section__header">History</span>
                    <a className="sidebar__link" href="/applications">
                        <WorkIcon />
                        View Job Applications
                    </a>
                </div>
                <div className="sidebar__section">
                    <span className="sidebar__section__header">Actions</span>
                    <a className="sidebar__link" href="/">
                        <AutorenewIcon />
                        Update Application Status
                    </a>
                    <a className="sidebar__link" href="/upload-resume">
                        <DocumentScannerIcon />
                        Analyze Resume
                    </a>
                </div>
            </div>
            <div className="sidebar__actions">
                <StandardButton
                    display={
                        <span
                            style={{
                                display: "flex",
                                columnGap: "1rem",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <LogoutIcon />
                            Logout
                        </span>
                    }
                    onClick={handleLogout}
                    isTransparentBg={true}
                />
            </div>
        </div>
    );
}

export default Sidebar;
