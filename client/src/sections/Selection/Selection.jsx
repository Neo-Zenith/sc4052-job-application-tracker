import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Selection({ onChange }) {
    const [option, setOption] = useState("new");

    const handleOption = (event, newOption) => {
        if (newOption !== null) {
            setOption(newOption);
            onChange(newOption);
        }
    };

    return (
        <ToggleButtonGroup value={option} exclusive onChange={handleOption}>
            <ToggleButton
                value="new"
                sx={{
                    font: "500 1rem Inter",
                    border: "0.1rem solid #c1bfbf",
                    color: "#c1bfbf",
                    "&.Mui-selected, &.Mui-selected:hover": {
                        color: "black",
                        backgroundColor: "#a688fa",
                        border: "0.1rem solid #a688fa",
                    },
                    "&:hover": {
                        color: "black",
                        backgroundColor: "#a688fa",
                        border: "0.1rem solid #a688fa",
                    },
                }}
            >
                <span>Use new job application description</span>
            </ToggleButton>
            <ToggleButton
                value="existing"
                sx={{
                    font: "500 1rem Inter",
                    border: "0.1rem solid #c1bfbf",
                    color: "#c1bfbf",
                    "&.Mui-selected, &.Mui-selected:hover": {
                        color: "black",
                        backgroundColor: "#a688fa",
                        border: "0.1rem solid #a688fa",
                    },
                    "&:hover": {
                        color: "black",
                        backgroundColor: "#a688fa",
                        border: "0.1rem solid #a688fa",
                    },
                }}
            >
                <span>Import from existing job application</span>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
