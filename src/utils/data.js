import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB2CQ78YBCVeponJCfN3KGRAYu3G9_aYcY",
    authDomain: "ohio-voters-e4355.firebaseapp.com",
    databaseURL: "https://ohio-voters-e4355-default-rtdb.firebaseio.com",
    projectId: "ohio-voters-e4355",
    storageBucket: "ohio-voters-e4355.appspot.com",
    messagingSenderId: "397490319557",
    appId: "1:397490319557:web:5b15b6dbae2a311dc540ac"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firebaseDatabase = firebaseApp.database()

const getCincinnatiCounties = async () => {
    return await fetch('data/cincinnati_counties.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getOhioCities = async () => {
    return await fetch('data/ohio_cities.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getOhioOutline = async () => {
    return await fetch('data/ohio_outline.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getOhioHouseDistricts = async () => {
    return await fetch('data/ohio_house_district.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getOhioSenateDistricts = async () => {
    return await fetch('data/ohio_senate_district.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getUSHouseDistricts = async () => {
    return await fetch('data/us_house_district.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getOhioZipcodes = async () => {
    return await fetch('data/ohio_zip_codes.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

const getBipartisanStats = (stats, type) => {
    const majority = {"dem": [], "rep": []}
    if (stats.constructor === Object && stats !== null) {
        stats = Object.keys(stats).map(function (key) {
            return stats[key];
        });
        ;
    }
    for (const value of stats) {
        if (value === undefined) {
            continue;
        }
        var district;

        if ("STATE_REPRESENTATIVE_DISTRICT" in value) {
            district = value["STATE_REPRESENTATIVE_DISTRICT"];
        } else if ("CITY" in value) {
            district = value["CITY"];
        } else if ("CONGRESSIONAL_DISTRICT" in value) {
            district = value["CONGRESSIONAL_DISTRICT"];
        } else {
            district = value["STATE_SENATE_DISTRICT"];
        }

        var proportion = value["CODED_PARTY_AFFILIATION"] * value["Number of Rows (Aggregated)"];
        if (proportion >= 0) {
            const skew = Math.abs(value["CODED_PARTY_AFFILIATION"].toFixed(3)) + " skew towards Dem";
            majority.dem.push({
                value: Math.round(proportion),
                _id: district,
                color: "rgba(78, 165, 253, 0.6)",
                type: type,
                skew: skew,
                population: value["Number of Rows (Aggregated)"]
            });
        } else {
            const skew = Math.abs(value["CODED_PARTY_AFFILIATION"].toFixed(3)) + " skew towards Rep";
            majority.rep.push({
                value: Math.round(Math.abs(proportion)),
                _id: district,
                color: "rgba(253, 78, 78, 0.6)",
                type: type,
                skew: skew,
                population: value["Number of Rows (Aggregated)"]
            });
        }
    }

    const majority_grouped = {
        _id: "Party Affiliation", color: 'rgba(78, 165, 253, 0)', children: [
            {
                _id: (type !== "City") ? "Democratic Leaning " + type.slice(0, -2) + "s" : "Democratic Leaning Cities",
                // color: "hsl(217, 70%, 50%)",
                color: 'rgba(78, 165, 253, 0.36)',

                children: majority.dem,
            },
            {
                _id: (type !== "City") ? "Republican Leaning " + type.slice(0, -2) + "s" : "Republican Leaning Cities",
                // color: "hsl(338, 70%, 50%)",
                color: 'rgba(253, 78, 78, 0.36)',
                children: majority.rep,
            },
        ]
    }
    return majority_grouped;
}

const getBipartisanEngagement = (stats, type) => {
    const majority = {
        "Score": [{id: "Democrat Leaning", data: []}, {id: "Republican Leaning", data: []}],
        "Primary": [{id: "Democrat Leaning", data: []}, {id: "Republican Leaning", data: []}],
        "General": [{id: "Democrat Leaning", data: []}, {id: "Republican Leaning", data: []}],
        "Special": [{id: "Democrat Leaning", data: []}, {id: "Republican Leaning", data: []}],
    };
    if (stats.constructor === Object && stats !== null) {
        stats = Object.keys(stats).map(function (key) {
            return stats[key];
        });
        ;
    }
    for (const value of stats) {
        if (value === undefined) {
            continue;
        }
        var district;

        if ("STATE_REPRESENTATIVE_DISTRICT" in value) {
            district = value["STATE_REPRESENTATIVE_DISTRICT"];
        } else if ("CITY" in value) {
            district = value["CITY"];
        } else if ("CONGRESSIONAL_DISTRICT" in value) {
            district = value["CONGRESSIONAL_DISTRICT"];
        } else {
            district = value["STATE_SENATE_DISTRICT"];
        }

        const typesOfScores = ["Score", "Primary", "General", "Special"]

        var proportion = value["CODED_PARTY_AFFILIATION"] * value["Number of Rows (Aggregated)"];
        if (proportion >= 0) {
            const skew = parseFloat(value["CODED_PARTY_AFFILIATION"].toFixed(3));

            for (const s of typesOfScores) {
                if (value[s] !== undefined) {
                    majority[s][0].data.push({
                        size: Math.round(proportion),
                        _id: district,
                        color: "rgba(78, 165, 253, " + Math.abs(0.6 + 3 * skew) + ")",
                        type: type,
                        x: skew,
                        y: value[s],
                        population: value["Number of Rows (Aggregated)"]
                    });
                }
            }
        } else {
            const skew = parseFloat(value["CODED_PARTY_AFFILIATION"].toFixed(3));

            for (const s of typesOfScores) {
                if (value[s] !== undefined) {
                    majority[s][1].data.push({
                        size: Math.round(Math.abs(proportion)),
                        _id: district,
                        color: "rgba(253, 78, 78, " + (0.6 + Math.abs(3 * skew)) + ")",
                        type: type,
                        x: skew,
                        y: value[s],
                        population: value["Number of Rows (Aggregated)"]
                    });
                }
            }
        }
    }
    return majority;
}

const getAgeInfluences = (stats, type) => {
    var statistics = [];
    if (stats.constructor === Object && stats !== null) {
        stats = Object.keys(stats).map(function (key) {
            return stats[key];
        });
        ;
    }
    for (const value of stats) {
        if (value === undefined) {
            continue;
        }
        var district;

        if ("STATE_REPRESENTATIVE_DISTRICT" in value) {
            district = value["STATE_REPRESENTATIVE_DISTRICT"];
        } else if ("CITY" in value) {
            district = value["CITY"];
        } else if ("CONGRESSIONAL_DISTRICT" in value) {
            district = value["CONGRESSIONAL_DISTRICT"];
        } else {
            district = value["STATE_SENATE_DISTRICT"];
        }

        const skew = parseFloat(value["CODED_PARTY_AFFILIATION"].toFixed(3));
        const avg_age = parseFloat(value["avg_age"].toFixed(2));
        const score = value["Score"];
        const primary = value["Primary"];
        const general = value["General"];
        const special = value["Special"];
        var color;
        if (skew >= 0) {
            color = "rgba(78, 165, 253, 1)";
        } else {
            color = "rgba(253, 78, 78, 1)";
        }
        statistics.push({
            age: avg_age,
            _id: district,
            color: color,
            type: type,
            skew: skew,
            score: score,
            primary: primary,
            general: general,
            special: special,
            population: value["Number of Rows (Aggregated)"]
        });
    }
    statistics = statistics.sort((a, b) => (a.age > b.age) ? 1 : -1);
    return statistics;
}


export {
    getCincinnatiCounties,
    getOhioCities,
    getOhioOutline,
    getOhioHouseDistricts,
    getOhioSenateDistricts,
    getOhioZipcodes,
    getUSHouseDistricts,
    getBipartisanStats,
    getBipartisanEngagement,
    getAgeInfluences,
}
