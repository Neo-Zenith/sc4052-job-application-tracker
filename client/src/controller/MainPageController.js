class MainPageController {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getPast7DaysApplicationsCount = () => {
        // fetch logic

        return [3, 2, 9, 15, 4, 3, 2];
    };
}

export default MainPageController;