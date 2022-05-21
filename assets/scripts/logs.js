const baseURL = "http://localhost:8080";
const token = localStorage.getItem("token");

const firstLetterUp = (word) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const resetContent = () => {
	const content = document.querySelector(".content");
	content.innerHTML = "";
};

const displayMsg = (message) => {
	const msgContainer = document.querySelector(".content");
	msgContainer.innerHTML = message;
	msgContainer.classList.add("msgShow");
};

const showPetName = () => {
	const title = document.querySelector(".row-between > h1");
	title.textContent = localStorage.getItem("pet_name") + ": Health records";
};

const showLogData = (data) => {
	data.forEach((log) => {
		const logName = document.createElement("h3");
		logName.textContent = firstLetterUp(log.visit_type);

		const logDescriptionTitle = document.createElement("p");
		logDescriptionTitle.textContent = "Description";

		const logDescription = document.createElement("p");
		logDescription.textContent = log.description;

		const logDate = document.createElement("p");
		logDate.textContent = "Log date: " + log.created_at.toString().slice(0, 10);

		const contentBox = document.createElement("p");
		contentBox.classList.add("contentBox");

		contentBox.append(logName, logDescriptionTitle, logDescription, logDate);
		const content = document.querySelector(".content");
		content.append(contentBox);
	});
};

const showPrescriptionData = (data) => {
	data.forEach((prescript) => {
		const prescriptName = document.createElement("h3");
		prescriptName.textContent = firstLetterUp(prescript.med_name);

		const prescriptCommentTitle = document.createElement("p");
		prescriptCommentTitle.textContent = "Comment";

		const prescriptComment = document.createElement("p");
		prescriptComment.textContent = prescript.comment;

		const prescriptDate = document.createElement("p");
		prescriptDate.textContent = "Presciption date: " + prescript.created_at.toString().slice(0, 10);

		const contentBox = document.createElement("div");
		contentBox.classList.add("contentBox");

		contentBox.append(prescriptName, prescriptCommentTitle, prescriptComment, prescriptDate);
		const content = document.querySelector(".content");
		content.append(contentBox);
	});
};

const getData = async (token) => {
	try {
		const id = localStorage.getItem("pet_id");
		const res1 = await fetch(`${baseURL}/v1/logs/${id}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		const res2 = await fetch(`${baseURL}/v1/prescriptions/${id}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		const logs = await res1.json();
		const prescriptions = await res2.json();

		const data = [...logs, ...prescriptions];
		const filteredLogData = data.filter((item) => item.log_id);
		const filteredPrescripData = data.filter((item) => item.prescr_id);

		if (data.err) {
			return displayMsg(data.err);
		}

		if (data.length === 0) {
			showPetName();
			displayMsg("This pet has no logs yet");
		} else if (!logFilterBtn.classList.contains("active")) {
			showPetName();
			resetContent();
			showPrescriptionData(filteredPrescripData);
		} else if (!prescripFilterBtn.classList.contains("active")) {
			showPetName();
			resetContent();
			showLogData(filteredLogData);
		} else {
			showPetName();
			resetContent();
			showLogData(filteredLogData);
			showPrescriptionData(filteredPrescripData);
		}
	} catch (err) {
		return displayMsg(err);
	}
};

if (!token) {
	location.replace("index.html");
} else {
	getData(token);
}

logFilterBtn.addEventListener("click", () => {
	logFilterBtn.classList.toggle("active");
	getData(token);
});

prescripFilterBtn.addEventListener("click", () => {
	prescripFilterBtn.classList.toggle("active");
	getData(token);
});

signOut.addEventListener("click", () => {
	localStorage.removeItem("token");
});
