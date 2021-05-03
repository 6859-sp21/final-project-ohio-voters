### Use to remove all discretized voting data from zipcode_jsons ###

import pandas as pd
import json
import os

for fname in os.listdir('public/data/zipcode_jsons'):
    with open('public/data/zipcode_jsons/' + fname , 'r') as file:
        df = pd.read_json('public/data/zipcode_jsons/' + fname)

    df = df.drop(df.columns[-64:], axis=1)

    with open('public/data/zipcode_jsons_small/' + fname , 'w') as file:
        json.dump(json.loads(df.to_json(orient='records')), file)

print('complete')