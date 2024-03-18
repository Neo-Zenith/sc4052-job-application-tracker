chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "SAVE_JOB") {
		console.log("[Extension] Saving job...");
		getToken()
			.then((token) => {
				fetch("http://localhost:8080/api/v1/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(request.payload),
				})
					.then((response) => response.json())
					.then((data) => sendResponse({ success: true }))
					.catch((error) => sendResponse({ success: false }));
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
