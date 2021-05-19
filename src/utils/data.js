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

const database = firebaseApp.database()

database.ref("zipcodes/43213").once('value').then(snapshot => snapshot.val()).then(d => console.log(d))

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

export {
    getCincinnatiCounties,
    getOhioCities,
    getOhioHouseDistricts,
    getOhioSenateDistricts,
    getUSHouseDistricts,
}
