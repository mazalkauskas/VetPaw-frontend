const baseURL = "http://localhost:8080";
const addForm = document.forms.addPet;
const token = localStorage.getItem("token");

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".msgContainer");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const addPet = async (userData) => {
	const res = await fetch(`${baseURL}/v1/pets/`, {
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

	location.replace("home.html");
};

addForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const pet_name = event.target.elements.name.value;
	const owner_email = event.target.elements.email.value;
	const animal = event.target.elements.animal.value;
	const breed = event.target.elements.breed.value;
	const date_of_birth = event.target.elements.dob.value;

	addPet({ pet_name, owner_email, animal, breed, date_of_birth });
});
