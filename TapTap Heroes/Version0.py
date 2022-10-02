# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 20:09:21 2020

@author: Dell
"""
#Assigning Variables of Team1
hero1=[]
attack1=[]
hp1=[]
speed1=[]
team1=[attack1, hp1, speed1]
n1=int(input("Enter the number of your Hero : "))
i=0 #index
while n1>0 and n1<=6:
    a=input("Please enter the name of Your hero. ")
    hero1.append(a)
    print(hero1)
    a=int(input("Please enter the attack of "+hero1[i] + " = "))
    attack1.append(a)
    a=int(input("Please enter the HP of "+hero1[i]+" = "))
    hp1.append(a)
    a=int(input("Please enter the speed of "+hero1[i]+" = "))
    speed1.append(a)
    n1-=1
    i+=1
    
a=speed1.index(max(speed1))

#Assigning Variables of Team2
hero2=[]
attack2=[]
hp2=[]
speed2=[]
team2=[attack2,hp2,speed2]
n2=int(input("Enter the number of your Enemy Hero : "))
i=0 #index
while n2>0 and n2<=6:
    a=input("Please enter the name of Your hero. ")
    hero2.append(a)
    print(hero1)
    a=int(input("Please enter the attack of "+hero2[i] + " = "))
    attack2.append(a)
    a=int(input("Please enter the HP of "+hero2[i]+" = "))
    hp2.append(a)
    a=int(input("Please enter the speed of "+hero2[i]+" = "))
    speed2.append(a)
    n2-=1
    i+=1  

n=n1+n2
new1=speed1.copy()
new2=speed2.copy()
for Round in range(15):
    speed1=new1.copy()
    speen2=new2.copy()
	for j in range(n): ###for each round
		if max(speed1)>max(speed2): ## team1 attack
			a=speed1.index(max(speed1)) # a is attacker
			damage=attack1[a]
			hp2[0]=hp2[0]-damage
			team1[2][a]=0
			if hp2[0]<=0: #dead
				dead=hero2[0]
				print(dead+" dies in round " +Round)
				hero2.remove(dead)
				for i in team2:
					i.remove(i[0])
					if len(i)==0:
						print("Congratulation, You won")
						break
    
		else: ## team2 attacks
			b=speed2.index(max(speed2)) # a is attacker
			damage=attack2[b]
			hp1[0]=hp1[0]-damage
			team2[2][b]=0
			if hp1[0]<=0:
				dead=hero1[0]
				print("We're sorry. "+dead+" dies in round "+Round)
				hero1.remove(dead)
				for i in team1:
					i.remove(i[0])
					if len(i)=0
						print("You lose try again")
						break