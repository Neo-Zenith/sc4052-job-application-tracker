document.addEventListener("DOMContentLoaded", function () {
	// Get the query string from the URL
	let params = new URLSearchParams(window.location.search);

	// Get the data parameter
	let base64Data = params.get("data");

	let decodedData = base64Decode(base64Data);

	// Convert the JSON string to an object
	jsonData = JSON.parse(decodedData);

	console.log(jsonData);

	createJobCard();
	createForm(jsonData);
});

document.getElementById("backBtn").addEventListener("click", function () {
	window.history.back();
});

function createForm(application) {
	const formContainer = document.getElementById("updateForm");

	const fieldSelectLabel = document.createElement("label");
	fieldSelectLabel.setAttribute("for", "fieldSelect");
	fieldSelectLabel.textContent = "Select field to update:";
	formContainer.appendChild(fieldSelectLabel);

	const fieldSelect = document.createElement("select");
	fieldSelect.id = "fieldSelect";
	const fieldOptions = [
		"Job Title",
		"Company Name",
		"Application URL",
		"Company URL",
		"Job Description",
		"Remark",
		"Source",
		"Job Type",
		"Status",
	];
	fieldOptions.forEach((option) => {
		const fieldOption = document.createElement("option");
		fieldOption.value = option;
		fieldOption.textContent = option.charAt(0).toUpperCase() + option.slice(1);
		fieldSelect.appendChild(fieldOption);
	});
	formContainer.appendChild(fieldSelect);

	// Add an empty option as the default selected option
	const emptyOption = document.createElement("option");
	emptyOption.value = "";
	emptyOption.textContent = "Select field";
	emptyOption.selected = true;
	emptyOption.disabled = true;
	fieldSelect.insertBefore(emptyOption, fieldSelect.firstChild);

	// Add event listener to fieldSelect
	fieldSelect.addEventListener("change", function () {
		// Remove old dropdown if it exists
		const oldContentDiv = document.getElementById("updatedContentDiv");
		if (oldContentDiv) {
			oldContentDiv.remove();
		}

		const updatedContentDiv = document.createElement("div");
		updatedContentDiv.id = "updatedContentDiv";
		formContainer.appendChild(updatedContentDiv);

		const lineBreak = document.createElement("br");
		updatedContentDiv.appendChild(lineBreak);

		if (this.value === "Status") {
			const fieldSelectLabel = document.createElement("label");
			fieldSelectLabel.setAttribute("for", "updatedContent");
			fieldSelectLabel.textContent = "Select updated status:";
			updatedContentDiv.appendChild(fieldSelectLabel);

			const dropdown = document.createElement("select");
			dropdown.id = "updatedContent";
			const fieldOptions = [
				"Applied",
				"Assessment",
				"Interview",
				"Offered",
				"Rejected",
				"Ghosted",
			];
			fieldOptions.forEach((option) => {
				const fieldOption = document.createElement("option");
				fieldOption.value = option;
				fieldOption.textContent =
					option.charAt(0).toUpperCase() + option.slice(1);
				dropdown.appendChild(fieldOption);
			});
			updatedContentDiv.appendChild(dropdown);
		} else if (this.value === "Source") {
			const fieldSelectLabel = document.createElement("label");
			fieldSelectLabel.setAttribute("for", "updatedContent");
			fieldSelectLabel.textContent = "Select updated source:";
			updatedContentDiv.appendChild(fieldSelectLabel);

			const dropdown = document.createElement("select");
			dropdown.id = "updatedContent";
			const fieldOptions = ["LinkedIn"];
			fieldOptions.forEach((option) => {
				const fieldOption = document.createElement("option");
				fieldOption.value = option;
				fieldOption.textContent =
					option.charAt(0).toUpperCase() + option.slice(1);
				dropdown.appendChild(fieldOption);
			});
			updatedContentDiv.appendChild(dropdown);
		} else if (this.value === "Job Type") {
			const fieldSelectLabel = document.createElement("label");
			fieldSelectLabel.setAttribute("for", "updatedContent");
			fieldSelectLabel.textContent = "Select updated job type:";
			updatedContentDiv.appendChild(fieldSelectLabel);

			const dropdown = document.createElement("select");
			dropdown.id = "updatedContent";
			const fieldOptions = ["Full-Time", "Part-Time", "Internship", "Contract"];
			fieldOptions.forEach((option) => {
				const fieldOption = document.createElement("option");
				fieldOption.value = option;
				fieldOption.textContent =
					option.charAt(0).toUpperCase() + option.slice(1);
				dropdown.appendChild(fieldOption);
			});
			updatedContentDiv.appendChild(dropdown);
		} else {
			const updatedContentLabel = document.createElement("label");
			updatedContentLabel.setAttribute("for", "updatedContent");
			updatedContentLabel.textContent = "Updated Content:";
			updatedContentDiv.appendChild(updatedContentLabel);

			const updatedContentInput = document.createElement("textarea");
			updatedContentInput.id = "updatedContent";
			updatedContentDiv.appendChild(updatedContentInput);
		}
	});

	const lineBreak = document.createElement("br");
	formContainer.appendChild(lineBreak);

	const actionBtnDiv = document.getElementById("actionBtns");

	const submitButton = document.createElement("button");
	submitButton.type = "submit";
	submitButton.textContent = "Update";
	submitButton.setAttribute("form", "updateForm");
	actionBtnDiv.appendChild(submitButton);

	formContainer.addEventListener("submit", function (event) {
		event.preventDefault();

		const fieldSelect = document.getElementById("fieldSelect");
		const selectedField = fieldSelect.value;

		const updatedContentInput = document.getElementById("updatedContent");
		const updatedContent = updatedContentInput.value;

		// TODO: Perform input validation

		const payload = {
			...application,
			[selectedField.toLowerCase()]: updatedContent,
		};
		console.log(payload);

		getToken()
			.then((token) => {
				return fetch(
					`http://localhost:8080/api/v1/applications/${application.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(payload),
					}
				);
			})
			.then((data) => {
				console.log("Success:", data);
				setTimeout(() => {
					window.open("../templates/popup.html", "_self");
				}, 10000);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});
}

function createJobCard() {
	const jobCard = document.getElementById("jobContainer");

	let jobTitle = document.createElement("h2");
	jobTitle.innerHTML = `${jsonData.jobTitle}<br>at<br>${jsonData.companyName}`;
	jobCard.appendChild(jobTitle);

	let applicationUrl = document.createElement("p");
	let applicationLink = document.createElement("a");
	applicationLink.href = jsonData.applicationUrl;
	applicationLink.target = "_blank";
	applicationLink.textContent = "Link";
	applicationUrl.innerHTML = "<strong>Application URL: </strong>";
	applicationUrl.appendChild(applicationLink);
	jobCard.appendChild(applicationUrl);

	let companyUrl = document.createElement("p");
	let companyLink = document.createElement("a");
	companyLink.href = jsonData.companyUrl;
	companyLink.target = "_blank";
	companyLink.textContent = "Link";
	companyUrl.innerHTML = "<strong>Company URL: </strong>";
	companyUrl.appendChild(companyLink);
	jobCard.appendChild(companyUrl);

	let jobDescription = document.createElement("p");
	jobDescription.classList.add("job-description");
	jobDescription.innerHTML = `<strong>Job Description:</strong> ${jsonData.jobDescription}`;
	jobCard.appendChild(jobDescription);

	let remark = document.createElement("p");
	remark.classList.add("job-description");
	remark.innerHTML = `<strong>Remark:</strong> ${jsonData.remark || "N/A"}`;
	jobCard.appendChild(remark);

	let source = document.createElement("p");
	source.innerHTML = `<strong>Source:</strong> ${jsonData.source}`;
	jobCard.appendChild(source);

	let jobType = document.createElement("p");
	jobType.innerHTML = `<strong>Job Type:</strong> ${jsonData.jobType}`;
	jobCard.appendChild(jobType);

	let status = document.createElement("p");
	status.innerHTML = `<strong>Status:</strong> ${jsonData.status}`;
	jobCard.appendChild(status);
}

// Decode a base64 string
function base64Decode(base64) {
	let binary = atob(base64);
	let data = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		data[i] = binary.charCodeAt(i);
	}
	let decoder = new TextDecoder();
	return decoder.decode(data);
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
