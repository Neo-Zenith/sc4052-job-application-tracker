import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css";

function PastXDaysChart({ id, title, data, x }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            id: id,
            toolbar: {
                show: false,
            },
        },
    });

    const generatePastXDaysArray = (days) => {
        // Generate a string array of the past X days in the format "YYYY-MM-DD"
        let dateArray = [];
        for (let i = days; i > 0; i--) {
            let d = new Date();
            d.setDate(d.getDate() - i);
            dateArray.push(d.toISOString().split("T")[0]);
        }
        return dateArray;
    };

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
                categories: generatePastXDaysArray(x),
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
            },
        };
        setOptions(updatedOptions);
        setSeries(data);
    }, [data, x]);

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
