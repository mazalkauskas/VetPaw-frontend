const signOut = document.querySelector("#signOut");

signOut.addEventListener("click", () => {
	localStorage.removeItem("token");
});
