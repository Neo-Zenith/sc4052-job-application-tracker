import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function PieChart({ title, data }) {
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
        <div className="chart-wrapper main-page-chart app-status-chart">
            <span className="chart-title">{title}</span>
            <div className="chart-container">
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    height={350}
                />
            </div>
        </div>
    );
}

export default PieChart;
