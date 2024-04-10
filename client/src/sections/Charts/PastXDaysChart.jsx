import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css";
import { ClipLoader } from "react-spinners";

function PastXDaysChart({ id, title, data, xValues, loaded }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            id: id,
            toolbar: {
                show: false,
            },
        },
    });

    useEffect(() => {
        const updatedOptions = {
            ...options,
            stroke: {
                curve: "straight",
            },
            colors: ["#a688fa"],
            grid: {
                row: {
                    colors: ["#121212", "#282828"],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: xValues,
                labels: {
                    style: {
                        colors: "#ffffff",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#ffffff",
                    },
                },
                min: 0,
            },
        };
        setOptions(updatedOptions);
        setSeries(data);
    }, [data, xValues]);

    return (
        <>
            <div
                className="chart-wrapper main-page-chart"
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
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </>
    );
}

export default PastXDaysChart;
