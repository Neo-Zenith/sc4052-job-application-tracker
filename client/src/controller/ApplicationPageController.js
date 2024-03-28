class ApplicationPageController {
    filter = (filterOptions, data) => {
        const { status } = filterOptions;
        if (Object.keys(filterOptions).length === 0) {
            return data;
        }
        if (status === "All") {
            return data;
        }
        return data.filter((item) => item.status === status);
    };
}

export default ApplicationPageController;
