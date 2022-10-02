#Step0 predetermination
#Let random variable N be 1 if A attack B
#Let N be 0 if B attacks A


#Step1 begins
#Assigning variables of Hero A
HPa=100
attacka=400
defensea=5
defensebreaka=6
dodgeratea=0.01
speeda=500

#Assignning Variables of Hero B
HPb=300
attackb=110
defenseb=10
defensebreakb=0
dodgerateb=0
speedb=100
#Step1 Finishes

#Step2 is not required in this program

#Step3 Begins
z=2
for hit in range(z):
    if hit ==1:
        Damage = attacka*(1-(defenseb-defensebreaka)*0.01)
        print(Damage)
    else:
        Damage=0
    HPb = HPb-Damage   
    if HPb <0:
        p=1
        phm=1-dodgerateb
        p=p*phm
        print(p)
