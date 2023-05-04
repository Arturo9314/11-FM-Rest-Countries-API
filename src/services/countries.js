export const searchCountries = async ({search}) =>{    
    if(search==='') return null
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,cca3,flags')
        const json = await response.json()
        const allResults = json
        const mappedResults = allResults.filter((country)=>
        country?.name?.common.toLowerCase()?.includes(search.toLowerCase())
        )
        return mappedResults?.map(x=>({
            id: x?.cca3,
            flag: x?.flags.svg,
            flagAlt: x?.flags?.alt ? x?.flags.alt : `Flag of ${x?.name.common}`,
            name: x?.name.common,
            population: x?.population,
            region: x?.region,
            capital: x?.capital
        }))
    } catch (e) {
        throw new Error('Error searching a countries...')
    }
}

export const searchDetails = async ({name})=>{
    const nameToFind = name.replace(/_/g, ' ') 
    
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${nameToFind}?fullText=true`)
        const json = await response.json()
        const results = json
        const detailsObject = results[0]
        const currenciesArr = detailsObject?.currencies? 
            (Object.values(detailsObject?.currencies)).map((e)=>e.name):null
        const languagesArr = detailsObject?.languages?
            (Object.values(detailsObject?.languages)):null
        const detailsCapital = detailsObject?.capital? detailsObject?.capital[0]: null
        const native = detailsObject?.name?.nativeName ? Object.values(detailsObject?.name?.nativeName)[0]: null
        const nativeFullName = native ? native.common ? native.common: native.official ? native.official : null : null 
        const flagDescription =  detailsObject?.flags?.alt ? detailsObject?.flags?.alt : `Flag of ${detailsObject?.name.common}`
        const mappedDetails = {
            id: detailsObject?.cca3,
            flag: detailsObject?.flags.svg,
            flagAlt: flagDescription,
            name: detailsObject?.name.common,
            nativeName: nativeFullName,
            population: detailsObject?.population,
            region: detailsObject?.region,
            subRegion: detailsObject?.region,
            capital: detailsCapital,
            topLevelDomain: detailsObject?.tld[0],
            currencies: currenciesArr,
            languages: languagesArr,
            borderCountries: detailsObject.borders
        }
        return mappedDetails
    }catch(e){
        throw new Error(e)
    }
}

export const searchByCode = async({code})=>{
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        const json = await response.json()
        const result = json
        const nameToShow = result[0].name.common
        return nameToShow
    } catch (e) {
        throw new Error(e)
    }
}