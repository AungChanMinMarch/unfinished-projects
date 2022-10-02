const get_start = () => {};
const get_start_btn = document.getElementById("get_start");
get_start_btn.onclick = () => {};

document.getElementById("menu").onclick = () => {
	document.querySelector("nav").classList.add("opened");
};
document.getElementById("nav_bg").onclick = () => {
	document.querySelector("nav").classList.remove("opened");
};
