import firebase_admin
from firebase_admin import db, credentials
from tqdm import tqdm
import pandas as pd
import json

cred = credentials.ApplicationDefault()
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ohio-voters-e4355-default-rtdb.firebaseio.com/'
})

# with open('../data/aapiFinalData.json', 'r') as file:
#     voters_to_upload = json.load(file)
#
# updates = {}
# for key in voters_to_upload:
#     zip = str(int(float(key)))
#     print(zip)
#     db.reference(f"zipcodes/{zip}").update(json.loads(voters_to_upload[key]))

updates = {}

# cities = pd.read_csv('../data/summary_stats/byCity.csv')
# for i, row in cities.iterrows():
#     data = json.loads(row.to_json())
#     print(data['CITY'])
#     city = data['CITY']
#     city = city.replace('.', '')
#     updates[f"summaryStats/cities/{city}"] = data

# congressionals = pd.read_csv('../data/summary_stats/byCongressional.csv')
# for i, row in congressionals.iterrows():
#     data = json.loads(row.to_json())
#     number = data['CONGRESSIONAL_DISTRICT']
#     print(number)
#     updates[f"summaryStats/congressionalDistricts/{int(number)}"] = data

# stateHouseDistricts = pd.read_csv('../data/summary_stats/byStateHouse.csv')
# for i, row in stateHouseDistricts.iterrows():
#     data = json.loads(row.to_json())
#     number = data['STATE_REPRESENTATIVE_DISTRICT']
#     print(number)
#     updates[f"summaryStats/stateHouseDistricts/{int(number)}"] = data

# stateSenateDistricts = pd.read_csv('../data/summary_stats/byStateSenate.csv')
# for i, row in stateSenateDistricts.iterrows():
#     data = json.loads(row.to_json())
#     number = data['STATE_SENATE_DISTRICT']
#     print(number)
#     updates[f"summaryStats/stateSenateDistricts/{int(number)}"] = data

with open('../data/zipcode_stats.json', 'r') as file:
    zipcode_stats = json.load(file)

for zipcode in tqdm(zipcode_stats):
    db.reference(f"zipcodes/{zipcode}/stats").delete()

# db.reference().update(updates)

print("update succeeded")
