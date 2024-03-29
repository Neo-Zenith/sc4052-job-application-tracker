chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "SAVE_JOB") {
		console.log("[Extension] Saving job...");
		getToken()
			.then((token) => {
				fetch("http://172.171.242.107:8080/api/v1/applications", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(request.payload),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						sendResponse({ success: true });
					})
					.catch((error) => {
						throw error;
					});
			})
			.catch((error) => {
				console.log(error);
				sendResponse({ success: false });
			});

		// Will respond asynchronously.
		return true;
	} else if (request.type === "UPDATE_JOB") {
		console.log("[Extension] Updating job...");
		getToken()
			.then((token) => {
				fetch("http://172.171.242.107:8080/api/v1/applications", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(request.payload),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						sendResponse({ success: true });
					})
					.catch((error) => {
						throw error;
					});
			})
			.catch((error) => {
				console.log(error);
				sendResponse({ success: false });
			});

		// Will respond asynchronously.
		return true;
	}
});

async function getToken() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get("jwtToken", (result) => {
			const token = result.jwtToken;

			if (token) {
				resolve(token);
			} else {
				reject("No token found");
			}
		});
	});
}
