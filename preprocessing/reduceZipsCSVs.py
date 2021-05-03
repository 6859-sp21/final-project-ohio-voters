### Use to convert reduced jsons to csvs for down-stream performance improvements ###

import pandas as pd
import json
import os

# specify columns to filter out unnecessary first two columns
cols = 'SOS_VOTERID,COUNTY_NUMBER,LAST_NAME,FIRST_NAME,MIDDLE_NAME,SUFFIX,DATE_OF_BIRTH,REGISTRATION_DATE,VOTER_STATUS,PARTY_AFFILIATION,RESIDENTIAL_ADDRESS1,RESIDENTIAL_SECONDARY_ADDR,RESIDENTIAL_CITY,RESIDENTIAL_STATE,RESIDENTIAL_ZIP,RESIDENTIAL_ZIP_PLUS4,CITY,CITY_SCHOOL_DISTRICT,CONGRESSIONAL_DISTRICT,COURT_OF_APPEALS,LOCAL_SCHOOL_DISTRICT,PRECINCT_NAME,STATE_BOARD_OF_EDUCATION,STATE_REPRESENTATIVE_DISTRICT,STATE_SENATE_DISTRICT,TOWNSHIP,VILLAGE,WARD'
cols = cols.split(',')

for fname in os.listdir('public/data/zipcode_jsons_small'):
    zipCode = fname.split('.')[0]

    df = pd.read_json('public/data/zipcode_jsons_small/' + fname)

    with open('public/data/zipcode_csvs_small/' + zipCode + '.csv' , 'w') as file:
        df.to_csv(file, columns=cols)

print('complete')