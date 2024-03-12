// document.addEventListener("DOMContentLoaded", function () {
// 	chrome.storage.local.get("username", function (data) {
// 		document.getElementById("username").textContent = data.username;
// 	});
// });

document.getElementById("logout").addEventListener("click", function () {
	// Remove the token from the local storage
	chrome.storage.local.remove("jwtToken", function () {
		// Update the UI
		// document.getElementById("username").textContent = "";
		alert("You have been logged out.");
	});
});
