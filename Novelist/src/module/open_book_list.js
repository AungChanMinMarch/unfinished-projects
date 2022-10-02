function open_book_list() {
	window.indexedDB.databases().then((dbs) => {
		let db_names = [];
		const books_container = document.getElementById("book_library");
		books_container.innerHTML = "";
		for (var i = 0; i < dbs.length; i++) {
			db_names.push(dbs[i].name);
		}
		for (var i = 0; i < db_names.length; i++) {
			const db_name = db_names[i];
			const book_name = db_name.split("_")[0];

			const book_el = document.createElement("a");
			book_el.append(book_name);
			book_el.href = `#book_${db_name}`;

			books_container.appendChild(book_el);
		}
	});
}

export default open_book_list;
