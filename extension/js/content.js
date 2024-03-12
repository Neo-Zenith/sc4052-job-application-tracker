document.addEventListener("click", async function (event) {
	// console.log("[Extension] Click event!", event.target);
	if (
		event.target.matches(".jobs-apply-button") ||
		event.target.matches(".artdeco-button__text")
	) {
		console.log("[Extension] Clicked on apply button!");
		const jobDetails = await extractJobDetails();
		const payload = {
			...jobDetails,
			status: "Applied",
			source: "LinkedIn",
		};
		console.log(payload);

		chrome.runtime.sendMessage(
			{ type: "SAVE_JOB", payload: payload },
			function (response) {
				if (response.success) {
					console.log("[Extension] Job saved successfully");
				} else {
					console.log("[Extension] Failed to save job");
				}
			}
		);
	}
});

// Extract job details from the page
async function extractJobDetails() {
	// Job details
	const jobTitleSpanElement = document.querySelector(
		".job-details-jobs-unified-top-card__job-title-link"
	);
	const jobTitleAnchorElement = jobTitleSpanElement.parentNode;
	const jobTitle = jobTitleSpanElement.innerText;
	const applicationUrl = jobTitleAnchorElement.href;
	const jobDescription = document.querySelector("#job-details").innerText;

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
	const jobType = jobTypeElement ? jobTypeElement.innerText : "";
	const isFullTime = jobType.toLowerCase().includes("full-time");
	const updatedJobType = isFullTime ? "Full-Time" : jobType;

	return {
		jobTitle,
		jobDescription,
		applicationUrl,
		companyName,
		companyUrl,
		jobType: updatedJobType,
	};
}
