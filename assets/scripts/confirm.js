const baseURL = "http://localhost:8080";
const confirmForm = document.forms.resetConfirm;

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const resetPasswordConfirm = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/new-password`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await res.json();
	displayMsg(data.msg);

	if (data.err) {
		return displayMsg(data.err);
	}

	setTimeout(function () {
		location.replace("index.html");
	}, 3000);
};

confirmForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = event.target.elements.email.value;
	const token = event.target.elements.token.value;
	const password = event.target.elements.newPassword.value;

	resetPasswordConfirm({ email, token, password });
});
