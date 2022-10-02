def copy(team, state):
    nspeed=[]
    n=len(team)
    for i in range(n):
        a=team[i][state]
        nspeed.append(a)
    return(nspeed)