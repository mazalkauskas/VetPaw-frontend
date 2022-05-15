const baseURL = "http://localhost:8080";
const resetForm = document.forms.reset;

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const resetPassword = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/reset-password`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	location.replace("resetConfirm.html");
};

resetForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = event.target.elements.email.value;

	resetPassword({ email });
});
