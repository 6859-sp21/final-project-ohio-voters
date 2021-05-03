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
    return await fetch(`data/zipcode_jsons/${zipcode}.json`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

export {
    getCincinnatiCounties,
    getCincinnatiZipCodes,
    getZipcodeVoters,
}
