document.getElementById("loginForm").addEventListener("submit", (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	console.log("Making request to login...");

	fetch("http://localhost:8080/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
		.then((response) => response.json())
		.then((data) => {
			// Store the token
			console.log(data);
			chrome.storage.local.set({ jwtToken: data.token });
		})
		.catch((error) => console.error("Error:", error))
		.finally(() => {
			// Close the tab after storing the token
			chrome.tabs.getCurrent((tab) => {
				chrome.tabs.remove(tab.id);
			});
		});
});
