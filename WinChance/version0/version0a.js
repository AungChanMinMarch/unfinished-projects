window.onload = function(){
	var f1 = Number(prompt("Enter the number of your font line"));
	var b1 = Number(prompt("Enter the number of your back line"));
	var f2 = Number(prompt("Enter the number of enemy font line"));
	var b2 = Number(prompt("Enter the number of enemy back line"));
	var position = [b1,f1,f2,b2];
	for (var i = 0; i < position.length; i++) {
		while (position[i]>0){
			var x=(i==0 || i==1)?0 :1;//team
			var y=(i==1 || i==2)?position[i]:
			(i==0)?f1+position[i]:f2+position[i];//slotposition
			var z =
			(i==1 || i==2)?position[i]:3+position[i];
			var child = document.createElement("button");
			var node = document.createTextNode("Slot"+y);
			child.append(node);
			child.id="hero"+x+y;
			child.setAttribute("onclick","heroinfo("+x+","+y+")");
			var parent = document.getElementById("slot"+x+z);
			parent.appendChild(child);
			position[i]--;
		}
	}
}

var myteam = new Array();
var enemyteam = new Array();

var team =[myteam, enemyteam];

function state(name, speed){
	this.name = name;
	this.speed =speed;
}

function heroinfo(x,y){
	let hero = document.getElementById("hero"+x+y);
	let name = prompt("Enter the name of hero","Freya");
	let speed = Number(prompt("Enter speed"));

	hero.innerHTML = name + "<br>";
	hero.innerHTML += "speed - "+  speed + "<br>";

	team[x][y-1] = new state(name,speed);
}

function maximum(arr){
	var max = -Infinity;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].speed>max){
			max = arr[i].speed;
		}
	}
	return max;
}

function showResult(){
	alert(maximum(team[0]))
}