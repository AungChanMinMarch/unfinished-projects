import decode from ".././module/USVstring_to_ECMAstring.js";
import construct_book from ".././module/create_db.js";
import swipe from ".././module/swipe.js";

let db = null;

const plotBody = document.querySelector(".plot_body");

document.getElementById("plot").onclick = () => {};
document.getElementById("plotEdit").onclick = (e) => {
	plotBody.classList.add("edit");
	plotBody.style.transform = "translateX(0px)";
	for (const el of plotBody.childNodes) el.draggable = true;
};
document.getElementById("close").onclick = (e) => {
	plotBody.classList.remove("edit");
	for (const el of plotBody.childNodes) el.draggable = false;
};

function arraymove(arr, fromIndex, toIndex) {
	const element = arr[fromIndex];
	arr.splice(fromIndex, 1); //removing
	arr.splice(toIndex, 0, element); //readding
}

function get_data(id) {
	const tx = db.transaction("book");
	const store = tx.objectStore("book");
	return new Promise((res) => {
		const get_req = store.get(id);
		get_req.onsuccess = (e) => {
			res(e.target.result);
		};
	});
}
function updateDb(parentId, dragElId, dropElId) {
	get_data(parentId).then((data) => {
		const fromIndex = data.child.indexOf(dragElId);
		const toIndex = data.child.indexOf(dropElId);
		arraymove(data.child, fromIndex, toIndex);

		const tx = db.transaction("book", "readwrite");
		const store = tx.objectStore("book");
		const req = store.put(data);
		req.onsuccess = (e) => {
			// console.log("success"); do something
		};
	});
}

function drag_start(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.target.classList.add("grabbing");
}
const dragOver = (e) => {
	e.preventDefault();
};
const drop = (e) => {
	e.preventDefault();
	const dragElId = e.dataTransfer.getData("text/plain");
	const dropElId = e.target.id;
	if (dragElId == dropElId) return;

	const dragEl = document.getElementById(dragElId);
	const dropEl = e.target;
	const parentEl = dragEl.parentElement;

	dragEl.classList.remove("grabbing");
	const upOrDown = dragEl.compareDocumentPosition(dropEl); //return 2 if up, 4 if down
	if (upOrDown == 2)
		//up : insert before
		parentEl.insertBefore(dragEl, dropEl);
	else if (upOrDown == 4)
		//down : insert after
		parentEl.insertBefore(dragEl, dropEl.nextSibling);
	updateDb(parentEl.id, dragElId, dropElId);
};

function open_book_db(db_name) {
	const open_request = window.indexedDB.open(db_name);
	open_request.onupgradeneeded = (e) => {
		alert("The book you opened didn't exist or had been deleted!");
		db = e.target.result;
		const delete_req = indexedDB.deleteDatabase(db.name);
		window.history.back();
		delete_req.onsuccess = () => {
			//do something?
		};
	};
	open_request.onsuccess = (e) => {
		db = e.target.result;

		const book_name = db.name.split("_")[0];
		const name_el = document.getElementById("book_name");
		name_el.innerHTML = book_name;

		const tx = db.transaction("book");
		const store = tx.objectStore("book");

		get_data("0").then((data) => {
			const children_arr = data.child;
			plotBody.id = data.id;
			children_arr.forEach((child, index) => {
				get_data(child).then((child_data) => {
					const child_name = child_data.name;
					const el = document.createElement("div");
					el.append(child_name);
					el.id = child_data.id;

					el.ondragstart = drag_start;
					el.ondragover = dragOver;
					el.ondrop = drop;
					plotBody.appendChild(el);
					if (index == children_arr.length - 1) swipe(plotBody);
				});
			});
		});
	};
}

// export default open_book;
window.onload = () => {
	const string = decode(window.location.search);
	if (string.indexOf("?") != 0)
		// may not need this
		return window.location.replace("./error.html");

	const query_string = string.substring(1); //can't use replace method, the name of the novel may contain ?
	if (query_string.indexOf("name=") != 0)
		return window.location.replace("./error.html");

	const db_name = query_string.replace("name=", "");
	open_book_db(db_name);
};
