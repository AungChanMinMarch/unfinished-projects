let el = null,
	isDragging = false,
	startPosition = 0,
	currentTranslate = 0,
	previousTranslate = 0,
	animationId = 0,
	currentIndex = 0;
function canGrab() {
	if (el == null) return false;
	return !el.classList.contains("edit");
}
function reposition() {
	el.style.transform = `translateX(${currentTranslate}px)`;
}
function grapAnimate() {
	reposition();
	if (!isDragging) return;
	window.requestAnimationFrame(grapAnimate);
}

function touchStart(e) {
	if (!canGrab()) return;
	isDragging = true;
	startPosition = e.pageX || e.touches[0].clientX;
	e.target.classList.add("grabbing");
	animationId = window.requestAnimationFrame(grapAnimate);
}
function touchMove(e) {
	if (!canGrab()) return;
	if (!isDragging) return;
	const currentPosition = e.pageX || e.touches[0].clientX;
	currentTranslate = currentPosition - startPosition + previousTranslate;
	// previousPosition = positionX;
}
function touchEnd(e) {
	if (!canGrab()) return;
	isDragging = false;
	e.target.classList.remove("grabbing");

	const movedBy = currentTranslate - previousTranslate;
	const totalEl = el.childNodes.length;
	if (movedBy < -100 && currentIndex < totalEl - 1) currentIndex += 1;
	if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

	currentTranslate = currentIndex * -window.innerWidth * 0.92;
	reposition();
	previousTranslate = currentTranslate;
	window.cancelAnimationFrame(animationId);
}
function swipe(elNode) {
	el = elNode;
	elNode.ondragstart = (e) => {
		if (canGrab()) e.preventDefault();
	};

	elNode.ontouchstart = touchStart;
	elNode.ontouchmove = touchMove;
	elNode.ontouchend = touchEnd;

	elNode.onmousedown = touchStart;
	elNode.onmousemove = touchMove;
	elNode.onmouseup = touchEnd;
	elNode.onmouseleave = touchEnd;
}
export default swipe;
