import { IconButton, Toolbar, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import StandardButton from "../buttons/StandardButton";

function TableToolbar({ tableTitle, showFilters, filters }) {
    const [displayFilters, setDisplayFilters] = React.useState(false);

    const handleFilterClick = () => {
        setDisplayFilters(!displayFilters);
    };

    return (
        <>
            <Toolbar
                sx={{
                    padding: "0rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {tableTitle}
                {showFilters && (
                    <Tooltip sx={{ alignSelf: "flex-start" }}>
                        <IconButton onClick={handleFilterClick}>
                            {displayFilters ? (
                                <CloseIcon
                                    sx={{ color: "white", fontSize: "2rem" }}
                                />
                            ) : (
                                <FilterListIcon
                                    sx={{ color: "white", fontSize: "2rem" }}
                                />
                            )}
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            {displayFilters && filters && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "#2f2b3a",
                        marginTop: "1rem",
                        boxSizing: "border-box",
                        padding: "2rem",
                        marginBottom: "2rem",
                        flexWrap: "wrap",
                    }}
                >
                    {filters.map((filter) => {
                        switch (filter.type) {
                            case "select":
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: "1.5rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "white",
                                                font: "400 1.4rem Inter",
                                            }}
                                        >
                                            {filter.label}
                                        </span>
                                        <select
                                            key={filter.id}
                                            style={{
                                                cursor: "pointer",
                                                backgroundColor: "transparent",
                                                color: "white",
                                                font: "400 1.2rem Inter",
                                                border: "1px solid #ba9ffb",
                                                borderRadius: "5px",
                                                padding: "1rem 1.5rem",
                                            }}
                                            defaultValue={filter.defaultOption}
                                        >
                                            {filter.options.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                        }
                    })}
                    <div
                        style={{
                            display: "flex",
                            columnGap: "1.5rem",
                            marginLeft: "auto",
                        }}
                    >
                        <StandardButton
                            display={
                                <span style={{ font: "400 1.2rem Inter" }}>
                                    Apply
                                </span>
                            }
                            isTransparentBg={false}
                        />
                        <StandardButton
                            display={
                                <span style={{ font: "400 1.2rem Inter" }}>
                                    Reset
                                </span>
                            }
                            isTransparentBg={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default TableToolbar;
