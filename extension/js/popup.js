document.addEventListener("DOMContentLoaded", function () {
	chrome.storage.local.get("jwtToken", function (data) {
		const token = data.jwtToken;
		console.log("Token:", token);

		if (!token) {
			document.getElementById("username").textContent = "Current user: Guest";

			// User is not logged in
			const loginButton = document.createElement("button");
			loginButton.id = "login";
			loginButton.textContent = "Login";
			document.getElementById("actionBtns").appendChild(loginButton);

			document.getElementById("login").addEventListener("click", onLogin);
		} else {
			// User is logged in
			const payload = JSON.parse(atob(token.split(".")[1]));
			console.log("payload:", payload);

			document.getElementById(
				"username"
			).textContent = `Current user: ${payload.sub}`;

			const updateButton = document.createElement("button");
			updateButton.id = "applications";
			updateButton.textContent = "Update Application";
			document.getElementById("actionBtns").appendChild(updateButton);

			const logoutButton = document.createElement("button");
			logoutButton.id = "logout";
			logoutButton.textContent = "Logout";
			document.getElementById("actionBtns").appendChild(logoutButton);

			document.getElementById("logout").addEventListener("click", onLogout);
			document
				.getElementById("applications")
				.addEventListener("click", onUpdateApplications);
		}
	});
});

function onLogin() {
	window.open("../templates/login.html", "_self");
}

function onUpdateApplications() {
	window.open("../templates/applications.html", "_self");
}

function onLogout() {
	// Remove the token from the local storage
	chrome.storage.local.remove("jwtToken", function () {
		onLogin();
	});
}
