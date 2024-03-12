// Set up an alarm to check the token every minute
chrome.alarms.create("checkToken", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === "checkToken") {
		checkToken();
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "SAVE_JOB") {
		console.log("[Extension] Saving job...");
		getToken()
			.then((token) => {
				fetch("http://localhost:8080/api/v1/applications", {
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
		return true; // Will respond asynchronously.
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

async function checkToken() {
	console.log("[Extension] Checking token...");
	try {
		const token = await getToken();
		console.log("jwtToken result:", token);

		// Check if the token is expired
		const payload = JSON.parse(atob(token.split(".")[1]));
		const now = Date.now() / 1000;
		console.log("payload:", payload);

		if (payload.exp < now) {
			// Token is expired, notify the user and open the login page
			notifyUser();
			openLoginPage();
		}
	} catch (error) {
		console.log(error);
		// No token, open the login page
		openLoginPage();
	}
}

function notifyUser() {
	chrome.notifications.create({
		type: "basic",
		iconUrl: "../icon.png", // Path to the icon
		title: "Session expired",
		message: "Your session has expired. Please log in again.",
	});
}

function openLoginPage() {
	chrome.tabs.create({ url: "../templates/login.html" });
}
