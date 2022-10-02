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

team=[team0, team1]
hero=0
attack=1
hp=2
speed=3

for i in range(2):
    if i==0:
        j=int(input("Enter the number of YOUR hero. "))
        askname = "Please enter the name of YOUR hero. "
    else:
        j=int(input("Enter the number of ENEMY hero. "))
        askname = "Please enter the name of ENEMY hero"
    index=0
    while j>0 and j<=6:
        print(askname)
        heroname=input()
        team[i][hero].append(heroname)

        heroattack = int(input("The Attack of "+team[i][hero][index] +" is "))
        team[i][attack].append(heroattack)

        herohp = int(input("The HP of "+team[i][hero][index]+" is "))
        team[i][hp].append(herohp)

        herospeed = int(input("The Speed of "+team[i][hero][index]+" is "))
        team[i][speed].append(herospeed)

        index += 1
        j=j-1

nspeed0=speed0.copy()
nspeed1=speed1.copy()
nspeed = [nspeed0, nspeed1]
print(nspeed)

for Round in range(15):
    team[0][speed] = nspeed1.copy()
    team[1][speed] = nspeed1.copy()
	print(team[0][speed])
    x=len(team[0][hero])
    y=len(team[1][hero])
    n=x+y
    while n>0 and n<= x+y:
        if max(team[0][speed])>= max(team[1][speed]):
            atkteam = 0
            attacker = team[0][speed].index(max(team[0][speed]))
        else:
            atkteam = 1
            attacker = team[1][speed].index(max(team[1][speed]))
        team[atkteam][speed][attacker]=0
        Damage=team[atkteam][attack][attacker]
        team[1-atkteam][hp][0] -= Damage
        if team[1-atkteam][hp][0] <= 0:
            print(team[1-atkteam][hero][0] +"Dies in round ")
            print(Round)
            if team[1-atkteam][speed][0] != 0:
                print("Dies without attack")
            for state in team[1-atkteam]:
                state.remove(state[0])
                print(team)

        n-=1