/*
var age=4;
var isAdult = (age>=18) ? 1500: 333; //This can be anything, string or number
document.write(isAdult);
*/

/*
var age=113;
var votable = (age<0) ? "Age cannot be negative" : (age >=18) ? "Yes" : "NO";
//varname =(condition1)?value1:(condition2)?value2:value3
document.write(votable);
*/


/*
var age=-80;
if (age>0){
	if (age>=18){
		isAdult="Old enough"
	}else{
		isAdult="Too Young"
	}
}else{
	isAdult="Please enter your age. Your age cannot be negative."
}

 document.write(isAdult)
 */

/*
var month=1;
switch(month){//switch (expression){ case1: statements case2: statement case3:statement}
	case 0:
		document.write("January");
		break //usually a break should be put in each case statement

	case 1:
		alert("February");
		break //without break, JS continue running within the code. if anything matches under this, it run default block.

	case 3:
		alert("March")

	default: //default block can be omitted if there is no neeed to handle the case when no match is found
		alert("JS uses month=0 for January, and so on month=11 for December. \nSo month should be between 0 and 11.");
}*/

/*
//Ther are 3 kinds of loops in JS:for, while and do...while
//for(statement1 -excuted before; statement2 loop condition; statemnt3 excuted after each){code block to be executed}
for(let i=3; i>0 ;i--){
	document.write(i+"<br/>");//we can use html tags inside quotes
}
//while(condition){code block} //This very similar to Pyhon
var i=8;
while(i>0){
	document.write(i+"<br />");
	i=i-1}
//do{code block}while(condition)
do{
	document.write(i+"<br/>"); //The order of this two lines result different things. use wisely
	i=i+10
}while(i<100);
//break stops the whole loop; continue stops one iteration of the loop; return(in function) breaks the loop and gives some value
*/