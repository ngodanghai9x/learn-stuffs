# Enter your code here. Read input from STDIN. Print output to STDOUT
import email.utils
import re

pattern = r'^[a-z][\w\-\.]+@[a-z]+\.[a-z]{1,3}$'

for _ in range(0, int(input())):
    text = input()
    temp = email.utils.parseaddr(text)
    try:
        email1 = temp[1]
        match1 = re.match(pattern, email1)
        if (match1.start() >= 0):
            print(text, 'is valid email')
    except:
        pass
    # if re.match(pattern, email)