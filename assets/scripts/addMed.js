const baseURL = "http://localhost:8080";
const addMedForm = document.forms.addMed;
const token = localStorage.getItem("token");

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const addMed = async (userData) => {
	const res = await fetch(`${baseURL}/v1/medications/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userData),
	});
	const data = await res.json();

	if (data.err) {
		return displayMsg(data.err);
	}

	location.replace("addPrescription.html");
};

addMedForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const med_name = event.target.elements.med_name.value;
	const description = event.target.elements.description.value;

	console.log({ med_name, description });

	addMed({ med_name, description });
});
