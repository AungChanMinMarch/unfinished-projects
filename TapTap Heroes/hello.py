hero0=[]
hp0=[]
team0=[hero0,hp0]

hero1=[]
hp1=[]
team1=[hero1, hp1]

team=[team0,team1]

for i in range(2):
	if i==0:
		print("This is your team")
		a=int(input())
	else:
		print("This is ENEMY team")
		a=int(input())
	while a>0 and a<=6:
		b=input()
		team[i][0].append(b)
		team[i][1].append(b)
		a-=1
print(team)