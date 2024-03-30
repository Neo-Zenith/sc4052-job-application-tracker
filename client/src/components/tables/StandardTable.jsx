import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableToolbar from "./TableToolbar";
import StandardTableHead from "./TableHead";
import { ClipLoader } from "react-spinners";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function StandardTable({
    sortable,
    showPagination,
    tableWidth,
    tableTitle,
    showFilters,
    headCells,
    data,
    defaultOrderBy,
    defaultOrder,
    filters,
    onFilter,
    onResetFilter,
    loading,
}) {
    const [localData, setLocalData] = useState(data);
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - localData.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(localData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [localData, order, orderBy, page, rowsPerPage]
    );

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    return (
        <Box sx={{ width: "100%" }}>
            <Paper
                sx={{
                    width: "100%",
                    mb: 2,
                    padding: "2rem",
                    boxSizing: "border-box",
                    borderRadius: "1.5rem",
                    backgroundColor: "#282828",
                }}
            >
                <TableToolbar
                    tableTitle={tableTitle}
                    showFilters={showFilters}
                    filters={filters}
                    onFilter={onFilter}
                    onResetFilter={onResetFilter}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: tableWidth }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        <StandardTableHead
                            order={order}
                            orderBy={orderBy}
                            headCells={headCells}
                            onRequestSort={handleRequestSort}
                            sortable={sortable}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                        {headCells.map((cell) => {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    align={
                                                        cell.numeric
                                                            ? "right"
                                                            : "left"
                                                    }
                                                    sx={{ width: cell.width }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "#c1bfbf",
                                                            font: "400 1.3rem Inter",
                                                        }}
                                                    >
                                                        {row[cell.id]}
                                                    </span>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {visibleRows.length === 0 && !loading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                marginTop: "3rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <span
                                style={{
                                    font: "400 1.4rem Inter",
                                    fontStyle: "italic",
                                    color: "#c1bfbf",
                                }}
                            >
                                No result found.
                            </span>
                        </div>
                    )}
                    {loading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "3rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <ClipLoader color="white" />
                        </div>
                    )}
                </TableContainer>
                {showPagination && (
                    <TablePagination
                        sx={{
                            ".MuiTablePagination-displayedRows": {
                                color: "#ba9ffb",
                                font: "400 1.2rem Inter",
                            },
                            ".MuiTablePagination-selectLabel": {
                                color: "#ba9ffb",
                                font: "400 1.2rem Inter",
                            },
                        }}
                        slotProps={{
                            actions: {
                                nextButton: {
                                    style: {
                                        color: "#ba9ffb",
                                    },
                                },
                                previousButton: {
                                    style: {
                                        color: "#ba9ffb",
                                    },
                                },
                            },
                            select: {
                                style: {
                                    color: "#c1bfbf",
                                    backgroundColor: "transparent",
                                    font: "400 1.2rem Inter",
                                },
                                sx: {
                                    ".MuiSelect-icon": {
                                        color: "#c1bfbf",
                                        fontSize: "1.5rem",
                                    },
                                },
                                MenuProps: {
                                    sx: {
                                        ".MuiPaper-root": {
                                            backgroundColor: "#575757",
                                            color: "black",
                                        },
                                        ".MuiTablePagination-menuItem": {
                                            ":hover": {
                                                backgroundColor: "#a688fa",
                                                color: "black",
                                            },
                                            color: "#c1bfbf",
                                            display: "flex",
                                            justifyContent: "center",
                                            font: "400 1.2rem Inter",
                                        },
                                        ".MuiTablePagination-menuItem.Mui-selected":
                                            {
                                                ":hover": {
                                                    backgroundColor: "#ba9ffb",
                                                },
                                                backgroundColor: "#a688fa",
                                                color: "black",
                                            },
                                    },
                                },
                            },
                        }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
        </Box>
    );
}

export default StandardTable;
