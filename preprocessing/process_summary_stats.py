import pandas as pd
import json

df = pd.read_csv('../public/data/summary_stats/byStateSenate.csv')

json_string = df.to_json(orient="records")

json_object = json.loads(json_string)

with open('../public/data/byStateSenate.json', 'w') as fp:
    json.dump(json_object, fp)
