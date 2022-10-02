attack=[]

def info(attack):
	try:
		c=int(input("Enter "))
		attack.append(c)
		return attack
	except ValueError:
		print("Sorry Please Enter the integer")
		info(attack)
print(info(attack))
		