class ResumeListPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    async getResumes(parameters) {
        let url = "http://172.171.242.107:8080/api/v1/resumes";
        for (let key in parameters) {
            url += `?${key}=${parameters[key]}&`;
        }
        url = url.slice(0, -1);

        return [
            {
                id: 1,
                fileName: "John Doe Resume",
                jobTitle: "Software Engineer",
                date: "2021-09-01 12:00",
                score: 85,
            },
            {
                id: 2,
                fileName: "Jane Doe Resume",
                jobTitle: "Software Engineer",
                date: "2021-09-02 12:00",
                score: 90,
            },
            {
                id: 3,
                fileName: "John Doe Resume",
                jobTitle: "Software Engineer",
                date: "2021-09-03 12:00",
                score: 95,
            },
        ];
    }
}

export default ResumeListPageController;
