
/*
window.onload = function(){
	var x=Number(prompt("Enter the number of your hero"));
	if (x>0 && x<=6){
		while (x>0){
			var parent = document.getElementById()
			x--;
		}
	}
	else{
		alert("The number of your hero must be between 1 and 6");
		var x=Number(prompt("Enter the number of your hero"));
	}
}
*/
window.onload = function(){
	var f1 = Number(prompt("Enter the number of your font line"));
	var b1 = Number(prompt("Enter the number of your back line"));
	var f2 = Number(prompt("Enter the number of enemy font line"));
	var b2 = Number(prompt("Enter the number of enemy back line"));
	var position = [b1,f1,f2,b2];
	for (var i = 0; i < position.length; i++) {
		while (position[i]>0){
			var y=(i==0 || i==1)?0 :1;
			var x=(i==1|| i==2)?position[i]:3+position[i];
			var child = document.createElement("button");
			var node = document.createTextNode("Slot"+x);
			child.append(node);
			child.id="hero"+y+x;
			var parent = document.getElementById("slot"+y+x);
			parent.appendChild(child);
			position[i]--;
		}
	}
}