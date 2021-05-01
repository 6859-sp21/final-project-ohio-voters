import pandas as pd
# import numpy as np
# from datetime import date, timedelta
# import csv
import json

pd.set_option("display.max_rows", None, "display.max_columns", None)
df = pd.read_csv('data/CincinnatiClean.csv',
                 dtype=str,
                 parse_dates=['REGISTRATION_DATE'],
                 infer_datetime_format=True,
                 index_col='SOS_VOTERID')
df = df.fillna(0)


print(df.shape)
print(df.dtypes)
print(df.head)

with open('data/voters.json', 'w') as file:
    json.dump(df.to_json, file)
