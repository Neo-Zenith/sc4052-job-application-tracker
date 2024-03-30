import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import UploadResumePage from "./pages/UploadResumePage";
import ResumeScorePage from "./pages/ResumeScorePage";
import ResumeListPage from "./pages/ResumeListPage";

export const serverUrl = "http://10.91.176.73:8080/api/v1";

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
