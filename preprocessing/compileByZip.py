### Use to compile scoring data and original data by zip code ###

import pandas as pd
import json
import os

for fname in os.listdir('public/data/zipcode_csvs_small'):
    zipCode = fname.split('.')[0]

    df = pd.read_csv('public/data/zipcode_csvs_small/' + fname)

    scoresDf = pd.read_json('public/data/zipcode_voters/' + zipCode + '.json')

    joined = pd.concat(df, scoresDf, axis=1)

    with open('public/data/compiledVoters/' + zipCode + '.csv' , 'w') as file:
        joined.to_csv(file)

print('complete')