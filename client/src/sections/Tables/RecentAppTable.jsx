import StandardTable from "../../components/tables/StandardTable";
import "./Table.css";

function RecentAppTable() {
    return (
        <div className="recent-app-table">
            <StandardTable
                sortable={false}
                showPagination={false}
                tableWidth={300}
                tableTitle={
                    <span className="recent-app-table-title">
                        Recent Applications
                    </span>
                }
                showFilters={false}
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
                        companyName: "Facebook",
                        status: "Approved",
                    },
                    {
                        id: 3,
                        timestamp: "2021-09-03 12:00",
                        jobTitle: "Software Engineer",
                        companyName: "Amazon",
                        status: "Rejected",
                    },
                    {
                        id: 4,
                        timestamp: "2021-09-04 12:00",
                        jobTitle: "Software Engineer",
                        companyName: "Apple",
                        status: "Pending",
                    },
                    {
                        id: 5,
                        timestamp: "2021-09-05 12:00",
                        jobTitle: "Software Engineer",
                        companyName: "Microsoft",
                        status: "Pending",
                    },
                ]}
                defaultOrderBy={"timestamp"}
                defaultOrder={"desc"}
            />
        </div>
    );
}

export default RecentAppTable;
