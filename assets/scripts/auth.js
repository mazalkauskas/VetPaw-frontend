const baseURL = "http://localhost:8080";
const loginForm = document.forms.login;
const resetForm = document.forms.reset;
const confirmForm = document.forms.resetConfirm;

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

const resetPasswordConfirm = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/new-password`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await res.json();

	console.log(data);

	if (data.msg) {
		return displayMsg(data.msg);
	}

	setTimeout(function () {
		location.replace("../../index.html");
	}, 2000);
};

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = event.target.elements.email.value;
	const password = event.target.elements.password.value;

	login({ email, password });
});

confirmForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = event.target.elements.email.value;
	const token = event.target.elements.token.value;
	const password = event.target.elements.newPassword.value;

	resetPasswordConfirm({ email, token, password });
});
