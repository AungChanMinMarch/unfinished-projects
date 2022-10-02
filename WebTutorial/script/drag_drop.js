function drag_start_handler(e) {
	console.log(`The element was started to drag`);
	e.dataTransfer.setData("text/plain", e.target.innerText);
	e.dataTransfer.setData("text/html", "HELLO world");
	e.dataTransfer.effectAllowed = "copy";
	window.e = e;
}
function dragover(e) {
	e.preventDefault();
}
function drop(e) {
	e.preventDefault();
	const data = e.dataTransfer.getData("text/plain");
	console.log(data);
}
window.onload = () => {
	const draggableItem = document.getElementById("dragItem");
	draggableItem.ondragstart = drag_start_handler;

	const dropTarget = document.getElementById("dropTarget");
	dropTarget.ondragover = dragover;
	dropTarget.ondrop = drop;
};
