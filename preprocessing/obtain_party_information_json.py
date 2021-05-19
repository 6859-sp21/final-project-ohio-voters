import glob
import csv
import json

'''
    Variables I am going to need:
        % repub
        % dem
        % independent

        percentage of valid elections voted in
        percentage of population registered to vote

        ------------------------------- do this for now ----------------

        -> future improvements

        percentage of voters that voted in each election (bar chart)




'''
national_election_years = {2000,2004,2008,2012,2016,2020}
final_json = {}
path = "../data/zipcode/*.csv"
for fname in glob.glob(path):
    with open(fname) as csv_file:
        zipcode = fname.split('/')[-1][:-4]
        csv_reader = csv.reader(csv_file, delimiter=',')
        num_rep, num_dem, num_ind, election_turnout, total_elections, num_registered = 0,0,0,0,0,0
        col_names = []
        for row in csv_reader:
            col_names = row
            break
        for row in csv_reader:

            #Handle party affiliation data
            party_aff = row[10]
            num_registered += 1
            if (party_aff == ""):
                num_ind += 1
            elif (party_aff == "D"):
                num_dem += 1
            else:
                num_rep += 1

            #Handle election turnout data
            for i in range(29, 93):
                header = col_names[i]
                elec_info = header.split("-")
                elec_type = elec_info[0]
                # elec_year = elec_info[1].split("/")[2]
                if (party_aff != "" or elec_type != "PRIMARY"):
                    if (row[i] == "X"):
                        election_turnout += 1
                    total_elections += 1

        interior_json = {"num_dem":num_dem, "num_rep": num_rep, "num_ind" : num_ind, "election_turnout":election_turnout, "total_elections" : total_elections, "num_registered": num_registered}
        final_json[zipcode] = interior_json

with open('../data/zipcode_stats.json', 'w') as fp:
    json.dump(final_json, fp)
