// const baseURL = "http://localhost:8080";
// const token = localStorage.getItem("token");

const deletePet = async (petId) => {
	const res = await fetch(`${baseURL}/v1/pets/delete`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(petId),
	});
	const data = await res.json();

	if (data.err) {
		return displayMsg(data.err);
	}
};

deletePet(9);
