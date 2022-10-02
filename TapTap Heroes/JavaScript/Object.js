//This object's name is person. It has four properties. They are name, age, changeName and showPerson. 
//the last two are called object methods
function person(n1,n2){
	this.name = n1; //assigning n1 to a property called name
	this.age = n2; //assignning n2 to a property called age
	this.changeName = function(n3){ //defining a property as a method. property-changeName. it takes one argument.
		this.name = n3 ;//updating a property to n3
	}
	this.showPerson = function (){ //defining a property as a method. propertyname-showPerson. it takes no argument.
		document.write("His name is "+this.name+ " and his age is "+this.age +" .")//behavior of showPerson method
	}
}

var p1 = new person("John", 2);
var p2 = new person("Harry", 13);
/*
document.write(p1.name);
document.write(p2.age);

p1.changeName("Ron"); //objectname.propertyname to access a value inside an object
document.write(p1.name);
p2.showPerson();

document.write(p1.name.length);
//build-in length property is used to count the number of characters in a property or a string
//(if use on number, it gives underfined)
*/
function hiii() {
	alert("Hello")
}
setInterval(hiii, 3000);
/*
//the array literal syntax: var name=[value1,value2,value3];
var member = new Array("ACM", "HNS", "HEDA", "ATHA"); //This is another way for Array

document.write(member);

var member = new Array(7); //we can add the length of array if we know & can leave blank if we don't know. both is okay
member[0]="ACM";
member[1] = "HNS"
member[3]=4; //If we skip,JS save the blank as undefined. See the results below.
document.write(member);
document.write(member[5])
*/

/*
var team1=["Alucard","Funny","Harith", "Tigeral","Granger"];
var team2=["Alice", "Dyroth"];
document.write(team1.length);//we can use length property on arrays. but we can't use on objects.
team = team1.concat(team2);//concat property create new array(array1+array2). it doesn't affect on each array.
document.write(team1);
document.write(team2);
document.write(team);
*/

/*
var lightborn=["Tigeral"];
alert(lightborn);
lightborn=lightborn.concat("Alucard");
alert(lightborn);
*/

//Math object==> Math.Pi,Math.sqrt

