const baseURL = "http://localhost:8080";
const registerForm = document.forms.register;

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const register = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await res.json();

	if (data.err) {
		return displayMsg(data.err);
	}

	displayMsg("You have successfully created an account!");

	setTimeout(function () {
		location.replace("index.html");
	}, 3000);
};

registerForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = event.target.elements.username.value;
	const email = event.target.elements.email.value;
	const password = event.target.elements.password.value;

	register({ name, email, password });
});
