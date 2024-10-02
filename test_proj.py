import requests

import sys


filename = input("filename=")

#line = "http://ec2-16-16-205-202.eu-north-1.compute.amazonaws.com:3000"
line = "http://localhost:3000"

output = open(filename,"w")

sys.stdout = output

print(line)

print()


print("testing getting the about")

print("-------------------------")

try:

   text = ""

   #getting details of team manager

   url = line + "/about/"

   data = requests.get(url)

   print("url="+url)

   print("data.status_code="+str(data.status_code))

   print(data.content)

   print("data.text="+data.text)

   print(data.json())

   print("firstname="+data.json()[0]["firstname"])

   print("lastname="+data.json()[0]["lastname"])

   print("id="+str(data.json()[0]["id"]))

   text = text + data.json()[0]["firstname"] + " " + data.json()[0]["lastname"] + " "+ str(data.json()[0]["id"])

   print(text)

except Exception as e:

   print("problem")

   print(e)

print("")


print()

print("testing getting the report - 1")

print("------------------------------")

try:

   text = ""

   #getting the report

   url = line + "/report/?user_id=123123&year=2024&month=3"

   data = requests.get(url)

   print("url="+url)

   print("data.status_code="+str(data.status_code))

   print(data.content)

   print("data.text="+data.text)

   text = text + str(data.json()["dinner"])

   print(text)

except Exception as e:

   print("problem")

   print(e)

print("")


print()

print("testing adding calorie consumption")

print("----------------------------------")

try:

   text = ""

   #getting details of team manager

   url = line + "/addcalories/"

   data = requests.post(url,
          json={'user_id':123123,'year':2024,'month':4,'day':2,
                'description':'milk 9','category':'lunch','amount':8})

   print("url="+url)

   print("data.status_code="+str(data.status_code))

   print(data.content)

   print("data.text="+data.text)

   #id = data.json()["id"]

   #print("id of the added item is " + str(id))

except Exception as e:

   print("problem")

   print(e)

print("")


print()

print("testing getting the report - 2")

print("------------------------------")

try:

   text = ""

   #getting the report

   url = line + "/report/?user_id=123123&year=2024&month=4"

   data = requests.get(url)

   print("url="+url)

   print("data.status_code="+str(data.status_code))

   print(data.content)

   print("data.text="+data.text)

   text = text + str(data.json()["dinner"])

   print(text)

except Exception as e:

   print("problem")

   print(e)

print("")