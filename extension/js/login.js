document.getElementById("loginForm").addEventListener("submit", (event) => {
	event.preventDefault();

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const statusMessage = document.createElement("div"); // Create a new div element
	statusMessage.id = "statusMessage"; // Set the id of the status message element
	statusMessage.textContent = "Making request to login..."; // Set the initial status message
	document.getElementById("loginForm").appendChild(statusMessage); // Append the status message element to the login form

	fetch("http://172.171.242.107:8080/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error occurred during login!`); // Throw an error if the response is not ok
			}
			return response.json(); // Return the response as JSON
		})
		.then((data) => {
			console.log(data);
			// Store the token
			chrome.storage.local.set({ jwtToken: data.token });
			statusMessage.textContent = "Login successful!"; // Update the status message
			setTimeout(() => {
				window.open("../templates/popup.html", "_self");
			}, 3000);
		})
		.catch((error) => {
			console.error("Error:", error);
			statusMessage.textContent = "Error occurred during login!"; // Update the status message
		});
});
