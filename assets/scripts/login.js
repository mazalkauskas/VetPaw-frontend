const baseURL = "http://localhost:8080";
const loginForm = document.forms.login;

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const login = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/login`, {
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

	localStorage.setItem("token", data.token);
	location.replace("home.html");
};

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = event.target.elements.email.value;
	const password = event.target.elements.password.value;

	login({ email, password });
});
