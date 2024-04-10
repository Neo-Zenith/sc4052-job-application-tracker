import { useEffect, useState } from "react";
import StandardTable from "../components/tables/StandardTable";
import ApplicationPageController from "../controller/ApplicationPageController";
import Sidebar from "../sections/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import StandardButton from "../components/buttons/StandardButton";

function ApplicationsPage() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const accessToken = useSelector((state) => state.accessToken);
    const [data, setData] = useState([]);
    const [displayedData, setDisplayedData] = useState(data);
    const [dataLoaded, setDataLoaded] = useState(false);

    const applicationPageController = new ApplicationPageController(dispatch);

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
            width: 0.3,
        },
        {
            id: "companyName",
            numeric: false,
            disablePadding: false,
            label: "Company Name",
            width: 0.2,
        },
        {
            id: "status",
            numeric: false,
            disablePadding: false,
            label: "Status",
            width: 0.15,
        },
        {
            id: "applicationUrl",
            numeric: false,
            disablePadding: false,
            label: "Application URL",
            width: 0.15,
        },
    ];
    const tableTitle = (
        <span className="applications-table-title">Applications</span>
    );

    useEffect(() => {
        const fetchData = async () => {
            const applications =
                await applicationPageController.getApplications(
                    userId,
                    accessToken
                );
            setData([
                ...applications.map((application) => {
                    return {
                        id: application.id,
                        createdOn: new Date(
                            application.createdOn
                        ).toLocaleDateString("en-US"),
                        jobTitle: application.jobTitle,
                        companyName: application.companyName,
                        status:
                            application.status.slice(0, 1) +
                            application.status.slice(1).toLowerCase(),
                        applicationUrl: (
                            <StandardButton
                                display={
                                    <span style={{ font: "500 1.4rem Inter" }}>
                                        View
                                    </span>
                                }
                                onClick={() =>
                                    window.open(
                                        application.applicationUrl,
                                        "_blank"
                                    )
                                }
                            />
                        ),
                    };
                }),
            ]);
            setDisplayedData([
                ...applications.map((application) => {
                    return {
                        id: application.id,
                        createdOn: new Date(
                            application.createdOn
                        ).toLocaleDateString("en-US"),
                        jobTitle: application.jobTitle,
                        companyName: application.companyName,
                        status:
                            application.status.slice(0, 1) +
                            application.status.slice(1).toLowerCase(),
                        applicationUrl: (
                            <StandardButton
                                display={
                                    <span style={{ font: "500 1.4rem Inter" }}>
                                        View
                                    </span>
                                }
                                onClick={() =>
                                    window.open(
                                        application.applicationUrl,
                                        "_blank"
                                    )
                                }
                            />
                        ),
                    };
                }),
            ]);
            setDataLoaded(true);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (accessToken === "") {
            window.location.href = "/login";
        }
    }, [accessToken]);

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
                        onFilter={(filterOptions) => {
                            setDisplayedData(
                                applicationPageController.filter(
                                    filterOptions,
                                    data
                                )
                            );
                        }}
                        onResetFilter={() => {
                            setDisplayedData(data);
                            return {
                                status: "All",
                            };
                        }}
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
                                    "Applied",
                                    "Assessment",
                                    "Interview",
                                    "Rejected",
                                    "Offered",
                                ],
                                defaultOption: "All",
                            },
                        ]}
                        tableTitle={tableTitle}
                        headCells={headers}
                        data={displayedData}
                        loading={!dataLoaded}
                    />
                </div>
            </div>
        </>
    );
}

export default ApplicationsPage;
