import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ClipLoader } from "react-spinners";

function PieChart({ title, data, loaded }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            verticalAlign: "bottom",
            floating: false,
            fontSize: "14px",
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: "#ffffff",
            },
        },
    });

    useEffect(() => {
        setSeries(data.map((d) => d.value));
        setOptions({
            ...options,
            labels: data.map((d) => d.label),
            colors: data.map((d) => d.color),
        });
    }, [data]);

    return (
        <div
            className="chart-wrapper main-page-chart app-status-chart"
            style={{ position: "relative" }}
        >
            {loaded ? null : (
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "transparent",
                        zIndex: 1,
                    }}
                >
                    <ClipLoader color="white" size={30} />
                </div>
            )}
            <span className="chart-title">{title}</span>
            <div className="chart-container" style={{ marginTop: "2rem" }}>
                <div
                    style={{
                        filter: loaded
                            ? "blur(0)"
                            : "blur(1px) brightness(0.7)",
                    }}
                >
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
}

export default PieChart;
