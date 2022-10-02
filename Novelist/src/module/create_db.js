const names_obj = {
	Characters: {
		General: ["name", "Nickname(s)", "Gender"],
		Physical: ["height", "weight", "Body shape"],
		Mental: [
			"Education",
			"Intelligence",
			" Attitude towards School",
			"Bad habits",
		],
		Emotional: ["Strengths", "Desires", "Introvert or extrovert"],
		Spiritual: ["belief", "Religion", "Spirituality"],
		Relationships: ["Current Family", "Pets", "Friends", "Enemies"],
	},
	Events: {
		General: ["Date", "Time"],
	},
	Locations: {
		General: ["City", "Country", "Continent", "Planet"],
	},
	Props: {
		General: ["Purpose", "Symbolic value"],
	},
	Extras: {
		Custom: ["Custom 1", "Custom 2", "Custom 3"],
	},
};

function db_open_error(e) {
	console.log(`Database failed to open. error: ${e.target.error}`);
}

function create_children_array(child) {
	if (Array.isArray(child)) return child;
	let child_array = [];
	for (const property in child) {
		child_array.push(property);
	}
	return child_array;
}
function save(store, ids_obj) {
	if (Array.isArray(ids_obj))
		return ids_obj.forEach((id) => {
			const obj = {
				id: id,
				name: ids_names_obj[id], //name is parent
				child: null,
			};
			store.add(obj);
		});
	for (const id in ids_obj) {
		const obj = {
			id: id,
			name: ids_names_obj[id], //name is parent
			child: create_children_array(ids_obj[id]),
		};
		store.add(obj);
		save(store, ids_obj[id]);
	}
}

let id = -1;
let ids_names_obj = {};
function create_ids_obj(obj) {
	if (Array.isArray(obj)) {
		let arr = [];
		obj.forEach((item) => {
			id++;
			ids_names_obj[id] = item;
			arr.push(id);
		});
		return arr;
	}

	let ids_obj = {};
	for (const property in obj) {
		id++;
		ids_names_obj[id] = property;
		ids_obj[id] = create_ids_obj(obj[property]);
	}
	return ids_obj;
}

function construct_book(db) {
	//create stores here
	// const db = e.target.result;
	const store = db.createObjectStore("book", {
		keyPath: "id",
	});
	const plot_obj = { plot: names_obj };
	const ids_obj = create_ids_obj(plot_obj);
	save(store, ids_obj);
}

export default construct_book;
