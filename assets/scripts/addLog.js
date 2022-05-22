const baseURL = "http://localhost:8080";
const addLogForm = document.forms.addLog;
const token = localStorage.getItem("token");
const id = localStorage.getItem("pet_id");

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const addLog = async (userData) => {
	const res = await fetch(`${baseURL}/v1/logs/`, {
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

addLogForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const pet_id = Number(id);
	const visit_type = event.target.elements.visit_type.value;
	const description = event.target.elements.description.value;

	addLog({ pet_id, visit_type, description });
});
