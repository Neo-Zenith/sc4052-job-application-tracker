import {
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

function StandardTableHead({
    order,
    orderBy,
    headCells,
    onRequestSort,
    sortable,
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : "asc"
                                }
                                sx={{
                                    "&.MuiTableSortLabel-root": {
                                        color: "white",
                                    },
                                    "&.MuiTableSortLabel-root:hover": {
                                        color: "#ba9ffb",
                                    },
                                    "&.Mui-active": {
                                        color: "#ba9ffb",
                                    },
                                    "& .MuiTableSortLabel-icon": {
                                        color: "#ba9ffb !important",
                                    },
                                }}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <span
                                    style={{
                                        color: "#ba9ffb",
                                        font: "600 1.3rem Inter",
                                    }}
                                >
                                    {headCell.label.slice(0, 1) +
                                        headCell.label.slice(1).toUpperCase()}
                                </span>
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            <span
                                style={{
                                    color: "#ba9ffb",
                                    font: "600 1.3rem Inter",
                                }}
                            >
                                {headCell.label.slice(0, 1) +
                                    headCell.label.slice(1).toUpperCase()}
                            </span>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default StandardTableHead;
