import * as d3 from "d3";
import _45118 from '../data/zipcode/45118.csv'
import _45241 from '../data/zipcode/45241.csv'
import _45062 from '../data/zipcode/45062.csv'
import _45122 from '../data/zipcode/45122.csv'
import _45212 from '../data/zipcode/45212.csv'
import _45204 from '../data/zipcode/45204.csv'
import _45233 from '../data/zipcode/45233.csv'
import _45216 from '../data/zipcode/45216.csv'
import _45232 from '../data/zipcode/45232.csv'
import _45005 from '../data/zipcode/45005.csv'
import _45107 from '../data/zipcode/45107.csv'
import _45130 from '../data/zipcode/45130.csv'
import _45120 from '../data/zipcode/45120.csv'
import _45053 from '../data/zipcode/45053.csv'
import _45157 from '../data/zipcode/45157.csv'
import _45255 from '../data/zipcode/45255.csv'
import _45113 from '../data/zipcode/45113.csv'
import _45068 from '../data/zipcode/45068.csv'
import _45458 from '../data/zipcode/45458.csv'
import _45251 from '../data/zipcode/45251.csv'
import _45248 from '../data/zipcode/45248.csv'
import _45215 from '../data/zipcode/45215.csv'
import _45237 from '../data/zipcode/45237.csv'
import _45240 from '../data/zipcode/45240.csv'
import _45032 from '../data/zipcode/45032.csv'
import _45121 from '../data/zipcode/45121.csv'
import _45176 from '../data/zipcode/45176.csv'
import _45106 from '../data/zipcode/45106.csv'
import _45050 from '../data/zipcode/45050.csv'
import _45003 from '../data/zipcode/45003.csv'
import _45102 from '../data/zipcode/45102.csv'
import _45158 from '../data/zipcode/45158.csv'
import _45229 from '../data/zipcode/45229.csv'
import _45205 from '../data/zipcode/45205.csv'
import _45238 from '../data/zipcode/45238.csv'
import _45211 from '../data/zipcode/45211.csv'
import _45218 from '../data/zipcode/45218.csv'
import _45153 from '../data/zipcode/45153.csv'
import _45103 from '../data/zipcode/45103.csv'
import _45147 from '../data/zipcode/45147.csv'
import _45160 from '../data/zipcode/45160.csv'
import _45033 from '../data/zipcode/45033.csv'
import _45051 from '../data/zipcode/45051.csv'
import _45065 from '../data/zipcode/45065.csv'
import _45036 from '../data/zipcode/45036.csv'
import _45056 from '../data/zipcode/45056.csv'
import _45245 from '../data/zipcode/45245.csv'
import _45140 from '../data/zipcode/45140.csv'
import _45112 from '../data/zipcode/45112.csv'
import _45206 from '../data/zipcode/45206.csv'
import _45239 from '../data/zipcode/45239.csv'
import _45002 from '../data/zipcode/45002.csv'
import _45207 from '../data/zipcode/45207.csv'
import _45230 from '../data/zipcode/45230.csv'
import _45236 from '../data/zipcode/45236.csv'
import _45041 from '../data/zipcode/45041.csv'
import _45214 from '../data/zipcode/45214.csv'
import _45111 from '../data/zipcode/45111.csv'
import _45066 from '../data/zipcode/45066.csv'
import _45013 from '../data/zipcode/45013.csv'
import _45044 from '../data/zipcode/45044.csv'
import _45243 from '../data/zipcode/45243.csv'
import _45202 from '../data/zipcode/45202.csv'
import _45226 from '../data/zipcode/45226.csv'
import _45219 from '../data/zipcode/45219.csv'
import _45213 from '../data/zipcode/45213.csv'
import _45217 from '../data/zipcode/45217.csv'
import _45224 from '../data/zipcode/45224.csv'
import _45220 from '../data/zipcode/45220.csv'
import _45225 from '../data/zipcode/45225.csv'
import _45223 from '../data/zipcode/45223.csv'
import _45034 from '../data/zipcode/45034.csv'
import _45069 from '../data/zipcode/45069.csv'
import _45011 from '../data/zipcode/45011.csv'
import _45246 from '../data/zipcode/45246.csv'
import _45015 from '../data/zipcode/45015.csv'
import _45327 from '../data/zipcode/45327.csv'
import _45150 from '../data/zipcode/45150.csv'
import _45162 from '../data/zipcode/45162.csv'
import _45242 from '../data/zipcode/45242.csv'
import _45247 from '../data/zipcode/45247.csv'
import _45231 from '../data/zipcode/45231.csv'
import _45052 from '../data/zipcode/45052.csv'
import _45001 from '../data/zipcode/45001.csv'
import _45174 from '../data/zipcode/45174.csv'
import _45249 from '../data/zipcode/45249.csv'
import _45342 from '../data/zipcode/45342.csv'
import _45152 from '../data/zipcode/45152.csv'
import _45039 from '../data/zipcode/45039.csv'
import _45040 from '../data/zipcode/45040.csv'
import _45064 from '../data/zipcode/45064.csv'
import _45014 from '../data/zipcode/45014.csv'
import _45042 from '../data/zipcode/45042.csv'
import _45067 from '../data/zipcode/45067.csv'
import _45156 from '../data/zipcode/45156.csv'
import _45244 from '../data/zipcode/45244.csv'
import _45030 from '../data/zipcode/45030.csv'
import _45227 from '../data/zipcode/45227.csv'
import _45252 from '../data/zipcode/45252.csv'
import _45208 from '../data/zipcode/45208.csv'
import _45209 from '../data/zipcode/45209.csv'
import _45203 from '../data/zipcode/45203.csv'
import _45054 from '../data/zipcode/45054.csv'

const zipcodeMap = {
    '45118': _45118,
    '45241': _45241,
    '45062': _45062,
    '45122': _45122,
    '45212': _45212,
    '45204': _45204,
    '45233': _45233,
    '45216': _45216,
    '45232': _45232,
    '45005': _45005,
    '45107': _45107,
    '45130': _45130,
    '45120': _45120,
    '45053': _45053,
    '45157': _45157,
    '45255': _45255,
    '45113': _45113,
    '45068': _45068,
    '45458': _45458,
    '45251': _45251,
    '45248': _45248,
    '45215': _45215,
    '45237': _45237,
    '45240': _45240,
    '45032': _45032,
    '45121': _45121,
    '45176': _45176,
    '45106': _45106,
    '45050': _45050,
    '45003': _45003,
    '45102': _45102,
    '45158': _45158,
    '45229': _45229,
    '45205': _45205,
    '45238': _45238,
    '45211': _45211,
    '45218': _45218,
    '45153': _45153,
    '45103': _45103,
    '45147': _45147,
    '45160': _45160,
    '45033': _45033,
    '45051': _45051,
    '45065': _45065,
    '45036': _45036,
    '45056': _45056,
    '45245': _45245,
    '45140': _45140,
    '45112': _45112,
    '45206': _45206,
    '45239': _45239,
    '45002': _45002,
    '45207': _45207,
    '45230': _45230,
    '45236': _45236,
    '45041': _45041,
    '45214': _45214,
    '45111': _45111,
    '45066': _45066,
    '45013': _45013,
    '45044': _45044,
    '45243': _45243,
    '45202': _45202,
    '45226': _45226,
    '45219': _45219,
    '45213': _45213,
    '45217': _45217,
    '45224': _45224,
    '45220': _45220,
    '45225': _45225,
    '45223': _45223,
    '45034': _45034,
    '45069': _45069,
    '45011': _45011,
    '45246': _45246,
    '45015': _45015,
    '45327': _45327,
    '45150': _45150,
    '45162': _45162,
    '45242': _45242,
    '45247': _45247,
    '45231': _45231,
    '45052': _45052,
    '45001': _45001,
    '45174': _45174,
    '45249': _45249,
    '45342': _45342,
    '45152': _45152,
    '45039': _45039,
    '45040': _45040,
    '45064': _45064,
    '45014': _45014,
    '45042': _45042,
    '45067': _45067,
    '45156': _45156,
    '45244': _45244,
    '45030': _45030,
    '45227': _45227,
    '45252': _45252,
    '45208': _45208,
    '45209': _45209,
    '45203': _45203,
    '45054': _45054,
}

const getCincinnatiCounties = async () => {
    return await fetch('data/cincinnati_counties.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getCincinnatiZipCodes = async () => {
    return await fetch('data/cincinnati_zipcodes.geojson', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getZipcodeVoters = async zipcode => {
    return await d3.csv(zipcodeMap[zipcode])
}

export {
    getCincinnatiCounties,
    getCincinnatiZipCodes,
    getZipcodeVoters,
}
