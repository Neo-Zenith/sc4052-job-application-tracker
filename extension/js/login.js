document.getElementById("loginForm").addEventListener("submit", (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	let statusMessage = document.getElementById("statusMessage");
	if (statusMessage == null) {
		statusMessage = document.createElement("div");
		statusMessage.id = "statusMessage";
		statusMessage.textContent = "Making request to login...";
		document.getElementById("loginForm").appendChild(statusMessage);
	}

	const btn = document.getElementById("submitBtn");
	btn.innerText = "";
	btn.classList.add("loading");

	fetch("http://172.171.242.107:8080/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error occurred during login!`);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// Store the token
			chrome.storage.local.set({ jwtToken: data.token });
			btn.classList.remove("loading");
			btn.innerText = "Submit";
			statusMessage.textContent = "Login successful! Redirecting...";
			setTimeout(() => {
				window.open("../templates/popup.html", "_self");
			}, 1500);
		})
		.catch((error) => {
			console.error("Error:", error);
			btn.classList.remove("loading");
			btn.innerText = "Submit";
			statusMessage.textContent = "Error occurred during login!";
		});
});
