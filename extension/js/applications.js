document.addEventListener("DOMContentLoaded", function () {
	getToken()
		.then((token) => {
			return fetch("http://localhost:8080/api/v1/applications", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		})
		.then((response) => response.json())
		.then((applications) => {
			// Store the fetched applications in a list
			const applicationList = applications;

			// Display the applications in applications.html
			const listContainer = document.getElementById("cardsContainer");
			console.log("Creating job cards...");
			applicationList.forEach((application) => {
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
					console.log(cardData);
					openNewHTMLFile(cardData);
				});

				listContainer.appendChild(card);
			});
		})
		.catch((error) => {
			// Handle any errors that occur during the fetch
			console.error(error);
		});
});

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
