import { useEffect, useState } from "react";
import StandardTable from "../../components/tables/StandardTable";
import "./Table.css";

function RecentAppTable({ data, dataLoaded }) {
    const [applications, setApplications] = useState(data);
    useEffect(() => {
        setApplications(
            data.map((application) => {
                return {
                    id: application.id,
                    createdOn: new Date(
                        application.createdOn
                    ).toLocaleDateString("en-US"),
                    jobTitle: application.jobTitle,
                    companyName: application.companyName,
                    status: application.status,
                };
            })
        );
    }, [data]);

    const headers = [
        {
            id: "id",
            numeric: true,
            disablePadding: false,
            label: "ID",
            width: 0.05,
        },
        {
            id: "createdOn",
            numeric: false,
            disablePadding: false,
            label: "Applied At",
            width: 0.15,
        },
        {
            id: "jobTitle",
            numeric: false,
            disablePadding: false,
            label: "Job Title",
            width: 0.4,
        },
        {
            id: "companyName",
            numeric: false,
            disablePadding: false,
            label: "Company Name",
            width: 0.25,
        },
        {
            id: "status",
            numeric: false,
            disablePadding: false,
            label: "Status",
            width: 0.15,
        },
    ];
    const tableTitle = (
        <span className="recent-app-table-title">Recent Applications</span>
    );

    return (
        <div className="recent-app-table">
            <StandardTable
                sortable={false}
                showPagination={false}
                tableWidth={300}
                tableTitle={tableTitle}
                showFilters={false}
                headCells={headers}
                data={applications}
                defaultOrderBy={"timestamp"}
                defaultOrder={"desc"}
                loading={!dataLoaded}
            />
        </div>
    );
}

export default RecentAppTable;
