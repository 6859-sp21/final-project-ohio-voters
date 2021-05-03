### Use to create an engagement score for each voter based upon voting record ###

import pandas as pd
import datetime
from dateutil.relativedelta import relativedelta
import json
from tqdm import tqdm

pd.set_option("display.max_rows", None, "display.max_columns", None)

### FOR LOADING DATA AGAIN: ###
print('reading in data...')
df = pd.read_csv('public/data/CincinnatiClean.csv',
                 parse_dates=['REGISTRATION_DATE'],
                 infer_datetime_format=True,
                 index_col='SOS_VOTERID')

df = df.fillna('')
df = df.astype('str')

print('saving temp data file...')
df.to_pickle('public/data/tempData.pkl')
###

### for debugging ###
# print('loading from public/data/tempData.pkl...')
# df = pd.read_pickle('public/data/tempData.pkl')
###

print('parsing data...')
# get lists of all elections (strings -> DFs)
electionList = 'PRIMARY-03/07/2000,GENERAL-11/07/2000,SPECIAL-05/08/2001,GENERAL-11/06/2001,PRIMARY-05/07/2002,GENERAL-11/05/2002,SPECIAL-05/06/2003,GENERAL-11/04/2003,PRIMARY-03/02/2004,GENERAL-11/02/2004,SPECIAL-02/08/2005,PRIMARY-05/03/2005,PRIMARY-09/13/2005,GENERAL-11/08/2005,SPECIAL-02/07/2006,PRIMARY-05/02/2006,GENERAL-11/07/2006,PRIMARY-05/08/2007,PRIMARY-09/11/2007,GENERAL-11/06/2007,PRIMARY-11/06/2007,GENERAL-12/11/2007,PRIMARY-03/04/2008,PRIMARY-10/14/2008,GENERAL-11/04/2008,GENERAL-11/18/2008,PRIMARY-05/05/2009,PRIMARY-09/08/2009,PRIMARY-09/15/2009,PRIMARY-09/29/2009,GENERAL-11/03/2009,PRIMARY-05/04/2010,PRIMARY-07/13/2010,PRIMARY-09/07/2010,GENERAL-11/02/2010,PRIMARY-05/03/2011,PRIMARY-09/13/2011,GENERAL-11/08/2011,PRIMARY-03/06/2012,GENERAL-11/06/2012,PRIMARY-05/07/2013,PRIMARY-09/10/2013,PRIMARY-10/01/2013,GENERAL-11/05/2013,PRIMARY-05/06/2014,GENERAL-11/04/2014,PRIMARY-05/05/2015,PRIMARY-09/15/2015,GENERAL-11/03/2015,PRIMARY-03/15/2016,GENERAL-06/07/2016,PRIMARY-09/13/2016,GENERAL-11/08/2016,PRIMARY-05/02/2017,PRIMARY-09/12/2017,GENERAL-11/07/2017,PRIMARY-05/08/2018,GENERAL-08/07/2018,GENERAL-11/06/2018,PRIMARY-05/07/2019,PRIMARY-09/10/2019,GENERAL-11/05/2019,PRIMARY-03/17/2020,GENERAL-11/03/2020'
electionList = pd.DataFrame(electionList.split(','))
generalList = pd.DataFrame([e for e in electionList[0] if 'GENERAL' in e])
primaryList = pd.DataFrame([e for e in electionList[0] if 'PRIMARY' in e])
specialList = pd.DataFrame([e for e in electionList[0] if 'SPECIAL' in e])

# replace all blanks with zero, 'X' with 1 (only in election columns)
# not differentiating for party affiliation for primary votes
replacements = [{'': 0, 'X': 1, 'D': 1, 'R': 1, 'L': 1, 'G': 1, 'C': 1, 'S': 1, 'N': 1} for _ in range(len(electionList))]
# print(replacements)
# print(electionList)
toreplace = dict(zip(electionList[0], replacements))
# print('toreplace', toreplace)
df = df.replace(to_replace=toreplace)
# print(df.head(1))

# get lists of all the elections (datetimes -> Series)
electionDates = pd.Series([pd.to_datetime(d.split('-')[1]) for d in electionList[0]])
generalDates = pd.Series([pd.to_datetime(d.split('-')[1]) for d in generalList[0]])
primaryDates = pd.Series([pd.to_datetime(d.split('-')[1]) for d in primaryList[0]])
specialDates = pd.Series([pd.to_datetime(d.split('-')[1]) for d in specialList[0]])

# print(electionDates.shape)
# print('Election Dates:', electionDates)
# print(electionList.shape)
# print('Election List:', electionList)

# electionByDate = dict(electionDates, electionList)

def voter_activity_score(series):
    '''
    input: pd series object
    '''
    # print('CALL:', series.name)
    dob = pd.to_datetime(series['DATE_OF_BIRTH'])
    # if they were elgible to vote earlier than the earliest record (2000)
    # on 03/07/1982, the last person able to vote in the 2000 election was born
    first_election_eligble = pd.to_datetime('19820307', format='%Y%m%d')
    lower_bound = first_election_eligble
    if dob >= first_election_eligble:
        lower_bound = dob + relativedelta(years=18)

    #number of elections they were actually eligible to vote in
    eligibleVotes = electionList.drop(electionDates[electionDates <= lower_bound].index).shape[0]
    eligibleGeneral = generalList.drop(generalDates[generalDates <= lower_bound].index).shape[0]
    eligiblePrimary = primaryList.drop(primaryDates[primaryDates <= lower_bound].index).shape[0]
    eligibleSpecial = specialList.drop(specialDates[specialDates <= lower_bound].index).shape[0]
    # print(eligibleVotes)
    # print(series.loc[electionList[0].tolist()])
    # print(list(series.loc[electionList[0].tolist()]))
    
    # used to catch any new political party registration codes to account for 
    try:
        score = None if eligibleVotes == 0 else sum(series.loc[electionList[0].tolist()]) / eligibleVotes
        generalScore = None if eligibleGeneral == 0 else sum(series.loc[generalList[0].tolist()]) / eligibleGeneral
        primaryScore = None if eligiblePrimary == 0 else  sum(series.loc[primaryList[0].tolist()]) / eligiblePrimary
        specialScore = None if eligibleSpecial == 0 else sum(series.loc[specialList[0].tolist()]) / eligibleSpecial
    except:
        print('score prep', series.loc[electionList[0].tolist()])
        print('score prep', series.loc[generalList[0].tolist()])
        print('score prep', series.loc[primaryList[0].tolist()])
        print('score prep', series.loc[specialList[0].tolist()])
    
    pbar.update(1)

    return pd.Series([series.name, score, generalScore, primaryScore, specialScore])

print('sorting by zip code...')
dfs = dict(tuple(df.groupby('RESIDENTIAL_ZIP')))
total_records = df.shape[0]

print('calculating voter scores...')
pbar = tqdm(total=total_records)
for zipCode in dfs.keys():
    # print(zipCode)
    zipData = dfs[zipCode]
    scores = zipData.apply(voter_activity_score, axis=1)
    scores.columns = ['SOS_VOTERID', 'Score', 'General', 'Primary', 'Special']

    with open('public/data/zipcode_voters/' + str(zipCode) + '.json', 'w') as file:
        json.dump(json.loads(scores.to_json(orient='records')), file)
pbar.close()

print('complete.')
