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

document.addEventListener("DOMContentLoaded", function () {
	// Get the query string from the URL
	let params = new URLSearchParams(window.location.search);

	// Get the data parameter
	let base64Data = params.get("data");

	// Decode the data
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
			const fieldOptions = [
				"Viewed",
				"Applied",
				"Assessment",
				"Interview",
				"Offered",
				"Rejected",
				"Ghosted",
			];
			createDropdown(updatedContentDiv, fieldOptions);
		} else if (this.value === "Source") {
			const fieldOptions = ["LinkedIn"];
			createDropdown(updatedContentDiv, fieldOptions);
		} else if (this.value === "Job Type") {
			const fieldOptions = ["Full-Time", "Part-Time", "Internship", "Contract"];
			createDropdown(updatedContentDiv, fieldOptions);
		} else {
			const updatedContentLabel = document.createElement("label");
			updatedContentLabel.setAttribute("for", "updatedContent");
			updatedContentLabel.textContent = "Updated content:";
			updatedContentDiv.appendChild(updatedContentLabel);

			const updatedContentInput = document.createElement("textarea");
			updatedContentInput.id = "updatedContent";
			updatedContentDiv.appendChild(updatedContentInput);
		}
	});

	const lineBreak = document.createElement("br");
	formContainer.appendChild(lineBreak);

	const actionBtnDiv = document.getElementById("actionBtns");
	createUpdateBtn(actionBtnDiv, formContainer, application);
	createDeleteBtn(actionBtnDiv, application);
}

function createUpdateBtn(parentElement, formContainer, application) {
	const submitButton = document.createElement("button");
	submitButton.type = "submit";
	submitButton.textContent = "Update";
	submitButton.setAttribute("form", "updateForm");
	parentElement.appendChild(submitButton);

	formContainer.addEventListener("submit", function (event) {
		event.preventDefault();

		submitButton.classList.add("loading");
		submitButton.innerText = "";
		submitButton.disabled = true;

		const fieldSelect = document.getElementById("fieldSelect");
		const selectedField = fieldSelect.value;

		if (selectedField === "") {
			alert("Please select a field to update");
			return;
		}

		const updatedContentInput = document.getElementById("updatedContent");
		const updatedContent = updatedContentInput.value;

		const payload = {
			...application,
			[selectedField.toLowerCase()]: updatedContent,
		};
		console.log(payload);

		getToken()
			.then((token) => {
				return fetch(
					`http://172.171.242.107:80/api/v1/applications/${application.id}`,
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
				submitButton.classList.remove("loading");
				submitButton.innerText = "Update";
				submitButton.disabled = false;
				displayToast("Application updated successfully");
				setTimeout(() => {
					window.open("../templates/popup.html", "_self");
				}, 1000);
			})
			.catch((error) => {
				submitButton.classList.remove("loading");
				submitButton.innerText = "Update";
				submitButton.disabled = false;
				console.error("Error:", error);
			});
	});
}

function createDeleteBtn(parentElement, application) {
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.textContent = "Delete";
	parentElement.appendChild(deleteBtn);

	deleteBtn.addEventListener("click", function () {
		deleteBtn.classList.add("loading");
		deleteBtn.innerText = "";
		deleteBtn.disabled = true;

		getToken()
			.then((token) => {
				return fetch(
					`http://172.171.242.107:80/api/v1/applications/${application.id}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			})
			.then((data) => {
				console.log("Success:", data);
				deleteBtn.classList.remove("loading");
				deleteBtn.innerText = "Delete";
				deleteBtn.disabled = false;
				displayToast("Application deleted successfully");
				setTimeout(() => {
					window.open("../templates/popup.html", "_self");
				}, 1000);
			})
			.catch((error) => {
				deleteBtn.classList.remove("loading");
				deleteBtn.innerText = "Delete";
				deleteBtn.disabled = false;
				console.error("Error:", error);
			});
	});
}

function createDropdown(parentElement, fieldOptions) {
	const fieldSelectLabel = document.createElement("label");
	fieldSelectLabel.setAttribute("for", "updatedContent");
	fieldSelectLabel.textContent = "Select updated value:";
	parentElement.appendChild(fieldSelectLabel);

	const dropdown = document.createElement("select");
	dropdown.id = "updatedContent";
	fieldOptions.forEach((option) => {
		const fieldOption = document.createElement("option");
		fieldOption.value = option;
		fieldOption.textContent = option.charAt(0).toUpperCase() + option.slice(1);
		dropdown.appendChild(fieldOption);
	});
	parentElement.appendChild(dropdown);
	return dropdown;
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

	let source = document.createElement("p");
	source.innerHTML = `<strong>Source:</strong> ${jsonData.source}`;
	jobCard.appendChild(source);

	let jobType = document.createElement("p");
	jobType.innerHTML = `<strong>Job Type:</strong> ${jsonData.jobType}`;
	jobCard.appendChild(jobType);

	let status = document.createElement("p");
	status.innerHTML = `<strong>Status:</strong> ${jsonData.status}`;
	jobCard.appendChild(status);

	let remark = document.createElement("p");
	remark.classList.add("job-description");
	remark.innerHTML = `<strong>Remark:</strong> ${jsonData.remark || "N/A"}`;
	jobCard.appendChild(remark);
}

/** 
	Decode a base64 string
**/
function base64Decode(base64) {
	let binary = atob(base64);
	let data = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		data[i] = binary.charCodeAt(i);
	}
	let decoder = new TextDecoder();
	return decoder.decode(data);
}

function displayToast(message) {
	const modalDiv = document.createElement("div");
	modalDiv.style.position = "fixed";
	modalDiv.style.top = "7.5%";
	modalDiv.style.left = "50%";
	modalDiv.style.transform = "translate(-50%, -50%)";
	modalDiv.style.width = "fit-content";
	modalDiv.style.height = "40px";
	modalDiv.style.backgroundColor = "rgba(0, 86, 179, 0.7)";
	modalDiv.style.display = "flex";
	modalDiv.style.justifyContent = "center";
	modalDiv.style.alignItems = "center";
	modalDiv.style.zIndex = "2147483647";
	modalDiv.style.padding = "5px";
	modalDiv.style.borderRadius = "25px";
	modalDiv.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.2)";
	modalDiv.style.transition = "opacity 0.5s ease";
	modalDiv.style.opacity = "0";

	const modalText = document.createElement("p");
	modalText.innerText = message;
	modalText.style.color = "#f2f2f2";
	modalText.style.fontWeight = "bold";
	modalText.style.fontSize = "14px";
	modalDiv.append(modalText);

	document.body.prepend(modalDiv);

	// Fade in animation
	setTimeout(() => {
		modalDiv.style.opacity = "1";
	}, 100);

	// Fade out animation after 3 seconds
	setTimeout(() => {
		modalDiv.style.opacity = "0";
		modalDiv.remove();
	}, 3000);
}
