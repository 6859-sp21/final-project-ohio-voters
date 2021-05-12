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
    getCincinnatiZipCodes,
    getOhioCities,
    getOhioHouseDistricts,
    getOhioSenateDistricts,
    getUSHouseDistricts,
}
