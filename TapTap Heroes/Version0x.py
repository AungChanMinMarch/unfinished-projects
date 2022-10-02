
hero1=[] #team1 variable assignment
attack1=[]
hp1=[]
speed1=[]
n1=int(input("Enter the number of your Hero : "))#asking team1 info
i=0 #index
while n1>0 and n1<=6:
    a=input("Please enter the name of Your hero. ")
    hero1.append(a)
    a=int(input("Please enter the attack of "+hero1[i] + " = "))
    attack1.append(a)
    a=int(input("Please enter the HP of "+hero1[i]+" = "))
    hp1.append(a)
    a=int(input("Please enter the speed of "+hero1[i]+" = "))
    speed1.append(a)
    n1-=1
    i+=1

	
hero2=[] #team2 variable assignment
attack2=[]
hp2=[]
speed2=[]
n2=int(input("Enter the number of your ENEMY hero : "))#Asking team2 information
i=0 #index
while n2>0 and n2<=6:
    a=input("Please enter the name of ENEMY hero. ")
    hero2.append(a)
    a=int(input("Please enter the attack of "+hero2[i] + " = "))
    attack2.append(a)
    a=int(input("Please enter the HP of "+hero2[i]+" = "))
    hp2.append(a)
    a=int(input("Please enter the speed of "+hero2[i]+" = "))
    speed2.append(a)
    n2-=1
    i+=1
	
battle=[[hero1, hp1, attack1, speed1],[hero2, hp2, attack2, speed2]]

print(battle)