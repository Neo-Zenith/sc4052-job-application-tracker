import StandardTable from "../components/tables/StandardTable";
import Sidebar from "../sections/Sidebar/Sidebar";

function ApplicationsPage() {
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
                        sortable={true}
                        showPagination={true}
                        tableWidth={800}
                        showFilters={true}
                        filters={[
                            {
                                id: "status",
                                label: "Status",
                                type: "select",
                                options: [
                                    "All",
                                    "Pending",
                                    "Approved",
                                    "Rejected",
                                ],
                                defaultOption: "All",
                            },
                        ]}
                        tableTitle={
                            <span className="applications-table-title">
                                Applications
                            </span>
                        }
                        headCells={[
                            {
                                id: "id",
                                numeric: true,
                                disablePadding: false,
                                label: "ID",
                            },
                            {
                                id: "timestamp",
                                numeric: false,
                                disablePadding: false,
                                label: "Applied At",
                            },
                            {
                                id: "jobTitle",
                                numeric: false,
                                disablePadding: false,
                                label: "Job Title",
                            },
                            {
                                id: "companyName",
                                numeric: false,
                                disablePadding: false,
                                label: "Company Name",
                            },
                            {
                                id: "status",
                                numeric: false,
                                disablePadding: false,
                                label: "Status",
                            },
                        ]}
                        data={[
                            {
                                id: 1,
                                timestamp: "2021-09-01 12:00",
                                jobTitle: "Software Engineer",
                                companyName: "Google",
                                status: "Pending",
                            },
                            {
                                id: 2,
                                timestamp: "2021-09-02 12:00",
                                jobTitle: "Software Engineer",
                                companyName: "Google",
                                status: "Approved",
                            },
                            {
                                id: 3,
                                timestamp: "2021-09-03 12:00",
                                jobTitle: "Software Engineer",
                                companyName: "Google",
                                status: "Rejected",
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default ApplicationsPage;
