import * as d3 from "d3";

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

export {
    getCincinnatiCounties,
    getCincinnatiZipCodes
}
