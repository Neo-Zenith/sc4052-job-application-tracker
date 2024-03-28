import { useEffect, useState } from "react";
import StandardTable from "../components/tables/StandardTable";
import ResumeListPageController from "../controller/ResumeListPageController";
import Sidebar from "../sections/Sidebar/Sidebar";
import StandardButton from "../components/buttons/StandardButton";

export default function ResumeListPage() {
    const [resumes, setResumes] = useState([]);
    const resumeListPageController = new ResumeListPageController();

    useEffect(() => {
        const getResumes = async () => {
            const resumes = await resumeListPageController.getResumes();
            for (let resume of resumes) {
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
                        headCells={[
                            {
                                id: "id",
                                numeric: true,
                                disablePadding: false,
                                label: "ID",
                            },
                            {
                                id: "fileName",
                                numeric: false,
                                disablePadding: false,
                                label: "File Name",
                            },
                            {
                                id: "jobTitle",
                                numeric: false,
                                disablePadding: false,
                                label: "Job Title",
                            },
                            {
                                id: "date",
                                numeric: false,
                                disablePadding: false,
                                label: "Upload Date",
                            },
                            {
                                id: "score",
                                numeric: true,
                                disablePadding: false,
                                label: "Score",
                            },
                            {
                                id: "action",
                                numeric: true,
                                disablePadding: false,
                                label: "Action",
                            },
                        ]}
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
