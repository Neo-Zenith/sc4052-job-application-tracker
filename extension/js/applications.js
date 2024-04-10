document.addEventListener("DOMContentLoaded", function () {
	const applicationsLabel =
		document.getElementsByClassName("applications-label")[0];
	let loadingDiv = document.getElementsByClassName("loading")[0];

	getToken()
		.then((token) => {
			applicationsLabel.textContent = "Loading applications...";
			loadingDiv.style.display = "block";
			loadingDiv.style.margin = "2rem auto";
			const payload = JSON.parse(atob(token.split(".")[1]));
			console.log("payload:", payload);

			return fetch(
				`http://172.171.242.107:8080/api/v1/applications?userId=${payload.userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		})
		.then((response) => response.json())
		.then((applications) => {
			loadingDiv.style.display = "none";

			// Display the applications
			createApplicationCards(applications);

			applicationsLabel.textContent = "Select an application to update";
		})
		.catch((error) => {
			loadingDiv.remove();
			loadingDiv.style.display = "none";
			applicationsLabel.textContent = "Failed to load applications";
			console.error(error);
		});
});

document.getElementById("backBtn").addEventListener("click", function () {
	window.history.back();
});

function createApplicationCards(applications) {
	const listContainer = document.getElementById("cardsContainer");
	console.log("Creating job cards...");
	applications.forEach((application) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const heading = document.createElement("h3");
		heading.textContent = application.jobTitle;

		const details = document.createElement("p");
		details.textContent = application.companyName;

		card.appendChild(heading);
		card.appendChild(details);

		card.addEventListener("click", () => {
			const cardData = { ...application };
			openNewHTMLFile(cardData);
		});

		listContainer.appendChild(card);
	});
}

// Encode a string to base64
function base64Encode(str) {
	let encoder = new TextEncoder();
	let data = encoder.encode(str);
	return btoa(String.fromCharCode(...new Uint8Array(data)));
}

function openNewHTMLFile(cardData) {
	const jsonData = JSON.stringify(cardData);
	const base64Data = base64Encode(jsonData);
	const newURL = `application.html?data=${base64Data}`;
	window.open(newURL, "_self");
}

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
