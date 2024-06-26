let isLoggedIn = false;

(async () => {
	console.log("[Extension] JobWise is active!");

	getToken()
		.then(() => {
			displayToast("JobWise is active!");
			isLoggedIn = true;
		})
		.catch(() => {
			displayToast("Please login to save jobs!", "red");
		});
})();

document.addEventListener("click", async function (event) {
	console.log("[Extension] Clicked", isApply(event));
	if (isLoggedIn && isApply(event)) {
		console.log("[Extension] Clicked on apply button!");
		displayToast("Saving job application...");
		const jobDetails = await extractJobDetails();
		const payload = {
			...jobDetails,
			status: "Applied",
			source: "LinkedIn",
		};

		console.log("[Extension]", payload);
		console.log("[Extension] Saving job...");
		chrome.runtime.sendMessage(
			{ type: "SAVE_JOB", payload: payload },
			function (response) {
				if (response.success) {
					console.log("[Extension] Job saved successfully");
					displayToast("Job application saved!");
				} else {
					console.log("[Extension] Failed to save job");
					displayToast("Failed to save job!", "red");
				}
			}
		);
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

function displayToast(message, color = "rgba(0, 86, 179, 0.7)") {
	const modalDiv = document.createElement("div");
	modalDiv.style.position = "fixed";
	modalDiv.style.top = "5%";
	modalDiv.style.left = "50%";
	modalDiv.style.transform = "translate(-50%, -50%)";
	modalDiv.style.width = "fit-content";
	modalDiv.style.height = "50px";
	modalDiv.style.backgroundColor = color;
	modalDiv.style.display = "flex";
	modalDiv.style.justifyContent = "center";
	modalDiv.style.alignItems = "center";
	modalDiv.style.zIndex = "2147483647";
	modalDiv.style.padding = "10px 15px";
	modalDiv.style.borderRadius = "25px";
	modalDiv.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.2)";
	modalDiv.style.transition = "opacity 0.5s ease";
	modalDiv.style.opacity = "0";

	const modalText = document.createElement("p");
	modalText.innerText = message;
	modalText.style.color = "#f2f2f2";
	modalText.style.fontWeight = "bold";
	modalText.style.fontSize = "20px";
	modalDiv.append(modalText);

	document.body.prepend(modalDiv);

	// Fade in animation
	setTimeout(() => {
		modalDiv.style.opacity = "1";
	}, 100);

	// Fade out animation after 1 seconds
	setTimeout(() => {
		modalDiv.style.opacity = "0";
		modalDiv.remove();
	}, 1000);
}

function isApply(event) {
	applyDivClicked = event.target.matches(".jobs-apply-button--top-card");
	applyButtonClicked = event.target.matches(".jobs-apply-button");
	applySpanClicked =
		event.target.matches(".artdeco-button__text") &&
		event.target.innerText.toLowerCase().includes("apply");

	return applyDivClicked || applyButtonClicked || applySpanClicked;
}

function isSubmitApplication(event) {
	applyButtonClicked = event.target.matches(
		".artdeco-button[aria-label*='Submit Application']"
	);
	applySpanClicked =
		event.target.matches(".artdeco-button__text") &&
		event.target.innerText.toLowerCase().includes("submit application");

	return applyButtonClicked || applySpanClicked;
}

// Extract job details from the page
async function extractJobDetails() {
	// Job details
	const jobTitleH2Element = document.querySelector(
		".job-details-jobs-unified-top-card__job-title"
	);
	const jobTitleAnchorElement = jobTitleH2Element.querySelector("a");
	const jobTitleSpanElement = jobTitleH2Element.querySelector("span");

	const jobTitle = jobTitleSpanElement.innerText;
	const applicationUrl = jobTitleAnchorElement.href;

	const jobDescriptionElement = document.querySelector("#job-details");
	const jobDescription = jobDescriptionElement.innerText.replace(
		/[\p{Emoji}]/gu,
		""
	);

	// Company details
	const companyElement = document.querySelector(
		"div.job-details-jobs-unified-top-card__primary-description-without-tagline > a"
	);
	const companyName = companyElement.innerText;
	const companyUrl = companyElement.href;

	// Job type
	const jobTypeElement = document.querySelector(
		".job-details-jobs-unified-top-card__job-insight.job-details-jobs-unified-top-card__job-insight--highlight"
	);
	let updatedJobType;
	switch (true) {
		case jobTypeElement.innerText.toLowerCase().includes("internship"):
			console.log("internship");
			updatedJobType = "Internship";
			break;
		case jobTitle.toLowerCase().includes("intern"):
			console.log("internship");
			updatedJobType = "Internship";
			break;
		case jobTypeElement.innerText.toLowerCase().includes("full-time"):
			console.log("full-time");
			updatedJobType = "Full-Time";
			break;
		default:
			console.log("default");
			updatedJobType = "Full-Time";
			break;
	}

	return {
		jobTitle,
		jobDescription,
		applicationUrl,
		companyName,
		companyUrl,
		jobType: updatedJobType,
	};
}
