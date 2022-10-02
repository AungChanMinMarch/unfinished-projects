hero0=[] #team0 variable assignment
attack0=[]
hp0=[]
speed0=[]
team0=[hero0, attack0, hp0, speed0]

hero1=[] #team1 variable assignment
attack1=[]
hp1=[]
speed1=[]
team1=[hero1, attack1, hp1, speed1]

battle=[team0, team1]
hero=0
attack=1
hp=2
speed=3

index=0
for i in range(2):
	if i==0:
		name="Please enter the NAME of YOUR hero."
		j=int(input("Enter the number of YOUR hero : "))#Asking team0 information
	else:
		name="Please enter the Name of ENEMY hero."
		j=int(input("Enter the number of ENEMY Hero : "))#asking team1 info
	while j>0 and j<=6:
		print(name)
        battle[i][hero].append("g")
        a=int(input("Please enter the ATTACK of "+battle[i][hero][index] + " = "))
    	battle[i][attack].append(a)
    	a=int(input("Please enter the HP of "+battle[i][hero][index]+" = "))
    	battle[i][hp].append(a)
    	a=int(input("Please enter the SPEED of "+battle[i][hero][index]+" = "))
    	battle[i][speed].append(a)
    	j=j-1
    	index +=1

nspeed=[speed0.copy(),speed1.copy()] #to regain the real speed of a hero

for Round in range(15):
	speed0=nspeed[0].copy() #Regaining real Speed
	speed1=nspeed[1].copy() #Regaining Real Speed
	x=len(battle[0][hero]) #no. of your hero left after (Round-1)
	y=len(battle[1][hero]) #no. of ENEMY hero left after (Round-1)
	n=x+y #no. of attack in a round
	while n<=x+y and n>0: #Each Round
		if max(speed0)>= max(speed1):
			attacker = speed0.index(max(speed0))
			speed0[attacker]=0
			atkteam=0
			print("team1 attacks")#Delete
		else:
			attacker = speed1.index(max(speed1))
			speed1[attacker]=0
			atkteam=1
			print("team2 attack")#Delete
		Damage = battle[atkteam][attack][attacker]
		battle[1-atkteam][hp][0]-=Damage
		if battle[1-atkteam][hp][0] <=0:
			print(battle[1-atkteam][hero][0]+" dies")
			if battle[1-atkteam][speed][0]!=0:
				print("dies without attacks ")
				n=n-1
			nspeed[1-atkteam].remove(nspeed[1-atkteam][0])
			for state in battle[1-atkteam]:
				state.remove(state[0])
				if len(state)==0:
					print("the winner team is ")
					print(atkteam)
					break
		else:
			print(battle[1-atkteam][hero][0]+"alives")
		n=n-1
	print(battle)
	print(Round)

if len(battle[1][hero])==0:
	print("Congratulation YOu Won")
else:
	print("You lose, Try again")