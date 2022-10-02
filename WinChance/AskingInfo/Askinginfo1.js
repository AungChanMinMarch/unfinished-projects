window.onload = function(){
	var f1 = Number(prompt("Enter the number of your font line"));
	var b1 = Number(prompt("Enter the number of your back line"));
	var f2 = Number(prompt("Enter the number of enemy font line"));
	var b2 = Number(prompt("Enter the number of enemy back line"));
	var position = [b1,f1,f2,b2];
	for (var i = 0; i < position.length; i++) {
		while (position[i]>0){
			var x=(i==0 || i==1)?0 :1;//team
			var y=(i==1|| i==2)?position[i]:3+position[i];//slotposition
			var child = document.createElement("button");
			var node = document.createTextNode("Slot"+y);
			child.append(node);
			child.id="hero"+x+y;
			child.setAttribute("onclick","heroinfo("+x+","+y+")");
			var parent = document.getElementById("slot"+x+y);
			parent.appendChild(child);
			position[i]--;
		}
	}
}

var myteam = new Array();
var enemyteam = new Array();

var team =[myteam, enemyteam];

function state(name, hp, attack, speed){
	this.name = name;
	this.hp = hp;
	this.attack =attack;
	this.speed =speed;
}

function heroinfo(x,y){
	let hero = document.getElementById("hero"+x+y);
	let name = prompt("Enter the name of hero","Freya");
	let attack = Number(prompt("Enter the attack"));
	let hp = Number(prompt("Enter hp"));
	let speed = Number(prompt("Enter speed"));

	hero.innerHTML = "";
	hero.innerHTML += name + "<br>";
	hero.innerHTML += "attack -" +attack + "<br>";
	hero.innerHTML += "hp - " + hp + "<br>";
	hero.innerHTML += "speed - "+  speed + "<br>";

	team[x,y-1] = new state(name, hp, attack, speed);
}
