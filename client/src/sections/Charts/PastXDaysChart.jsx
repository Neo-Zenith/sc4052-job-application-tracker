import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css";

function PastXDaysChart({ id, title, data, xValues }) {
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
            <div className="chart-wrapper main-page-chart">
                <span className="chart-title">{title}</span>
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    height={350}
                />
            </div>
        </>
    );
}

export default PastXDaysChart;
