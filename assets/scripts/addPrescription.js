const baseURL = "http://localhost:8080";
const addPrescripForm = document.forms.addPrescrip;
const token = localStorage.getItem("token");
const id = localStorage.getItem("pet_id");

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const selectMed = async () => {
	const res = await fetch(`${baseURL}/v1/medications`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const data = await res.json();

	if (data.length > 0) {
		const medId = [...new Set(data.map((id) => id.med_id))];
		const medNames = [...new Set(data.map((med) => med.med_name))];

		const medications = [medId.map((a, b) => [a, medNames[b]])];

		medications[0].forEach((med) => {
			const option = document.createElement("option");
			option.value = med[0];
			option.textContent = med[1];

			const medSelector = document.querySelector("#medication_id");
			medSelector.append(option);
		});
	}
};

const addPrescrip = async (userData) => {
	const res = await fetch(`${baseURL}/v1/prescriptions/`, {
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

	location.replace("logs.html");
};

addPrescripForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const pet_id = Number(id);
	const medication_id = Number(event.target.elements.medication_id.value);
	const comment = event.target.elements.comment.value;

	addPrescrip({ pet_id, medication_id, comment });
});

selectMed();
