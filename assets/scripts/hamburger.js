const hamburger = document.querySelector("#nav-hamburger");
const bars = document.querySelector(".fa-bars");

hamburger.addEventListener("click", () => {
	document.querySelector("nav").classList.toggle("visible");
	document.querySelector(".fa").classList.toggle("fa-bars");
	document.querySelector(".fa").classList.add("fa-times");
});
