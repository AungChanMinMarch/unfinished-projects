import construct_book from ".././module/create_db.js";

const title = document.getElementById("title");
const description = document.getElementById("description");

const refresh = () => {
	title.value = "";
	description.value = "";
};
function get_random_int(max) {
	return Math.floor(Math.random() * max);
}
const create_db_name = (name, number_of_digits) => {
	let db_name = name;
	for (var i = 0; i < number_of_digits; i++) {
		db_name += get_random_int(10);
	}
	return db_name;
};
document.getElementById("cancel").onclick = () => {
	refresh();
	window.history.back(1);
};
document.getElementById("ok").onclick = () => {
	//checking validating
	if (title.value == "") return alert("Sorry book name cannot be empty");
	if (title.value.includes("_"))
		return alert(
			"Sorry book name cannot contains _. Thank you for your understanding"
		); //checking ends here

	const name = create_db_name(title.value);
	const request = window.indexedDB.open(name);
	request.onupgradeneeded = (e) => {
		construct_book(e.target.result);
	};
	request.onsuccess = function (e) {
		const db = e.target.result;
		refresh();
		const next_page = `\\book.html?name=${db.name}`;
		window.location.replace(next_page);
	};
	request.onerror = (e) => {
		console.log(`Database failed to open. error: ${e.target.error}`);
	};
};
