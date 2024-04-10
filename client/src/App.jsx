import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import UploadResumePage from "./pages/UploadResumePage";
import ResumeScorePage from "./pages/ResumeScorePage";
import ResumeListPage from "./pages/ResumeListPage";
import UpdateApplicationStatusPage from "./pages/UpdateApplicationStatusPage";

export const serverUrl = "http://172.171.242.107:80/api/v1";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/applications"
                        element={<ApplicationsPage />}
                    />
                    <Route
                        path="/upload-resume"
                        element={<UploadResumePage />}
                    />
                    <Route path="/resume/:id" element={<ResumeScorePage />} />
                    <Route path="/resumes" element={<ResumeListPage />} />
                    <Route
                        path="/update-status"
                        element={<UpdateApplicationStatusPage />}
                    />
                </Routes>
            </Router>
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        border: "1px solid #713200",
                        padding: "1rem",
                        font: "400 1.2rem Inter",
                    },
                }}
            />
        </>
    );
}

export default App;
