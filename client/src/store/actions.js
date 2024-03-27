export const setAccessToken = (accessToken) => ({
    type: "SET_ACCESS_TOKEN",
    payload: accessToken,
});

export const setUsername = (username) => ({
    type: "SET_USERNAME",
    payload: username,
});

export const setUserId = (userId) => ({
    type: "SET_USER_ID",
    payload: userId,
});
