const baseURL = "http://localhost:8080";
const token = localStorage.getItem("token");

const firstLetterUp = (word) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".content");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const deletePet = async (id) => {
	await fetch(`${baseURL}/v1/pets/delete`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id }),
	});

	location.replace("home.html");
};

const viewLog = async (id) => {
	location.replace(`logs.html?pet_id=${id}`);
};

const showPetData = (data) => {
	const content = document.querySelector(".content");

	if (data.length > 0) {
		data.forEach((pet) => {
			const petName = document.createElement("h3");
			petName.textContent = firstLetterUp(pet.pet_name);

			const ownerEmail = document.createElement("p");
			ownerEmail.textContent = "Email: " + pet.owner_email;

			const animal = document.createElement("div");
			animal.textContent = "Animal: " + firstLetterUp(pet.animal);

			const breed = document.createElement("div");
			breed.textContent = "Breed: " + firstLetterUp(pet.breed);

			const animalInfo = document.createElement("div");
			animalInfo.classList.add("control2");
			animalInfo.append(animal, breed);

			const dob = document.createElement("p");
			dob.textContent = "Date of birth: " + pet.date_of_birth.toString().slice(0, 10);

			const viewLogBtn = document.createElement("button");
			viewLogBtn.textContent = "VIEW LOG";
			viewLogBtn.classList.add("btn", "pd2", "m1");
			viewLogBtn.addEventListener("click", () => {
				localStorage.setItem("pet_id", pet.id);
				localStorage.setItem("pet_name", firstLetterUp(pet.pet_name));
				viewLog(pet.id);
			});

			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "DELETE";
			deleteBtn.classList.add("btn2", "pd2", "m1");
			deleteBtn.addEventListener("click", () => {
				deletePet(pet.id);
			});

			const btnBlock = document.createElement("div");
			btnBlock.classList.add("control2");
			btnBlock.append(viewLogBtn, deleteBtn);

			const contentBox = document.createElement("div");
			contentBox.classList.add("contentBox");
			contentBox.append(petName, ownerEmail, animalInfo, dob, btnBlock);
			content.append(contentBox);
		});
	}
};

const getPetData = async (token) => {
	try {
		const res = await fetch(`${baseURL}/v1/pets/`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();

		if (data.err) {
			return displayMsg(data.err);
		}

		showPetData(data);
	} catch (err) {
		return displayMsg(err);
	}
};

if (!token) {
	location.replace("index.html");
} else {
	getPetData(token);
}

signOut.addEventListener("click", () => {
	localStorage.removeItem("token");
});
