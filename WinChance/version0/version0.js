window.onload = function(){ //drawing table
	var f1 = Number(prompt("Enter the number of your font line"));
	var b1 = Number(prompt("Enter the number of your back line"));
	var f2 = Number(prompt("Enter the number of enemy font line"));
	var b2 = Number(prompt("Enter the number of enemy back line"));
	var position = [b1,f1,f2,b2];
	for (var i = 0; i < position.length; i++) {
		while (position[i]>0){
			var x=(i==0 || i==1)?0 :1;//team
			var y=(i==1 || i==2)?position[i]:(i==0)?f1+position[i]:f2+position[i];//hero id & data
			var z = (i==1 || i==2)?position[i]:3+position[i]; //table position
			var child = document.createElement("button");
			var node = document.createTextNode("Click to add heroinfo");
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

function state(name, attack, hp, speed){
	this.name = name;
	this.attack = attackl
	this.hp = hp;
	this.speed =speed;
}

function heroinfo(x,y){
	let hero = document.getElementById("hero"+x+y);
	let name = prompt("Enter the name of hero","Freya");
	let attack = Number(prompt("Enter the attack"));
	let hp = Number(prompt("Enter the hp"));
	let speed = Number(prompt("Enter speed"));

	hero.innerHTML = name + "<br>";
	hero.innerHTML += "attack - "+  attack + "<br>";
	hero.innerHTML += "hp - "+  hp + "<br>";
	hero.innerHTML += "speed - "+  speed + "<br>";

	team[x][y-1] = new state(name, attack, hp, speed);
}

function maximum(arr){
	let max = -Infinity;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].speed>max){
			max = arr[i].speed;
		}
	}
	return max;
}

function maxindex(arr,max){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].speed == max){
			return i;
		}
	}
}

function speedcopy(arr1,arr2){
	for (var i = 0; i < arr1.length; i++) {
		arr2[i] = arr1[i].speed;
	}
}

var speed0 = new Array();
var speed1 = new Array();
speedcopy(team[0],speed0);
speedcopy(team[1],speed1);
var speedarr = [speed0, speed1];

function recopy(arr3, arr4){
	for (var i = 0; i < arr3.length; i++) {
		arr3[i].speed = arr4[i];
	}
}

function showResult(){
	for (let round=1 ; round<= 15; round++){
		recopy(team[0],speedarr[0]);
		recopy(team[1],speedarr[1]);
		var n = team[0].length + team[1].length;
		while(n>0){
			var atkteam = (maximum(team[0]) >= maximum(team[1]))? 0 : 1;
			var attacker = maxindex(team[atkteam],maximum(team[atkteam]));
			team[atkteam][attacker].speed = 0; //to attack only once
			var damage = team[atkteam][attacker].attack;
			team[1-atkteam][0].hp -=damage;
			if (team[1-atkteam][0].hp <=0){
				if (team[1-atkteam].speed!=0){ //dies without attack
					n--;
				}
				team[1-atkteam].shift();
				speedarr[1-atkteam].shift();
				if (team[1-atkteam].length ==0){
					alert("team"+atkteam + " won")
					break;
				}

			}
			n--;
		}
	}
}