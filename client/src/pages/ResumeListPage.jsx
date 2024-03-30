import { useEffect, useState } from "react";
import StandardTable from "../components/tables/StandardTable";
import ResumeListPageController from "../controller/ResumeListPageController";
import Sidebar from "../sections/Sidebar/Sidebar";
import StandardButton from "../components/buttons/StandardButton";
import { useSelector } from "react-redux";

export default function ResumeListPage() {
    const userId = useSelector((state) => state.userId);
    const accessToken = useSelector((state) => state.accessToken);
    const [resumes, setResumes] = useState([]);
    const resumeListPageController = new ResumeListPageController();

    const headers = [
        {
            id: "id",
            numeric: true,
            disablePadding: false,
            label: "ID",
            width: 0.1,
        },
        {
            id: "fileName",
            numeric: false,
            disablePadding: false,
            label: "File Name",
            width: 0.3,
        },
        {
            id: "date",
            numeric: false,
            disablePadding: false,
            label: "Upload Date",
            width: 0.3,
        },
        {
            id: "score",
            numeric: true,
            disablePadding: false,
            label: "Score",
            width: 0.2,
        },
        {
            id: "action",
            numeric: true,
            disablePadding: false,
            label: "Action",
            width: 0.1,
        },
    ];

    useEffect(() => {
        const getResumes = async () => {
            const resumes = await resumeListPageController.getResumes(
                userId,
                accessToken
            );
            for (let resume of resumes) {
                resume.date = new Date(resume.createdOn).toLocaleDateString(
                    "en-US"
                );
                resume.action = (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <StandardButton
                            display="View"
                            onClick={() =>
                                (window.location.href = "/resume/" + resume.id)
                            }
                        />
                    </div>
                );
            }
            setResumes(resumes);
        };
        getResumes();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <div
                    style={{
                        margin: "auto",
                        width: "90%",
                        display: "flex",
                        marginTop: "10rem",
                    }}
                >
                    <StandardTable
                        data={resumes}
                        headCells={headers}
                        showFilters={true}
                        showPagination={true}
                        showActions={true}
                        sortable={true}
                        tableWidth={250}
                        tableTitle={
                            <span className="applications-table-title">
                                Uploaded Resumes
                            </span>
                        }
                        defaultOrderBy={"date"}
                        defaultOrder={"desc"}
                        filters={[
                            {
                                id: "jobTitle",
                                label: "Job Title",
                                type: "text",
                            },
                        ]}
                        onFilter={() => {}}
                        onResetFilter={() => {}}
                    />
                </div>
            </div>
        </>
    );
}
