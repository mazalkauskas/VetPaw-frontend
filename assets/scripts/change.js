const baseURL = "http://localhost:8080";
const changeForm = document.forms.change;
const token = localStorage.getItem("token");

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const change = async (userData) => {
	const res = await fetch(`${baseURL}/v1/users/change-password`, {
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

	displayMsg("You have successfully updated your password!");

	setTimeout(function () {
		location.replace("home.html");
	}, 2000);
};

changeForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const oldPassword = event.target.elements.oldPass.value;
	const newPassword = event.target.elements.newPass.value;

	change({ oldPassword, newPassword });
});
