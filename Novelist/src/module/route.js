import open_book from "./open_book.js";
import open_book_list from "./open_book_list.js";

const get_view_id = (view) => {
	if (view == "") {
		open_book_list();
		return "home_page";
	}
	if (view.includes("book_")) {
		const db_name_USV = view.replace("book_", "");
		const db_name = decodeURIComponent(
			JSON.parse('"' + db_name_USV.replace(/\"/g, '\\"') + '"')
		);

		open_book(db_name);
		document.body.classList.add("loading");
		return "book_page";
	}
	return view;
};
const get_current_view = () => {
	const view = window.location.hash.replace("#", "");
	const view_id = get_view_id(view);
	const current_view = document.getElementById(view_id);
	if (current_view) return current_view;

	const error_view = document.getElementById("error_page");
	console.log("Sorry there is no html node with id = ", view_id);
	return error_view;
};
const update_view = () => {
	const old_view = document.querySelector(".current_scene");
	if (old_view) {
		old_view.classList.remove("current_scene");
		get_current_view().classList.add("current_scene");
	} else {
		console.error("sorry there is no view in previous things");
		document.getElementById("error_page").classList.add("current_scene");
	}
};

export default update_view;
