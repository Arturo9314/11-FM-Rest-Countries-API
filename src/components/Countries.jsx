import { NavLink } from "react-router-dom"
import '../styles/dropdown.css'

function ListOfCountries({countries, filteredBy}) {
    const filteredCountries = filteredBy? countries.filter((country)=>
        country?.region?.toLowerCase()?.includes(filteredBy.toLowerCase())
    ) : countries

    return (
        <ul className="countries">
            {filteredCountries.length>0?
                filteredCountries.map(
                    country => (
                        <li className="country" key={country?.id}>
                            <NavLink to={`/country/${country?.name.replace(/\s+/g, '_').toLowerCase()}`}>
                                <figure className="country-img">
                                    <img src={country?.flag} alt={country?.flagAlt} />
                                </figure>
                                <article className="country-info">
                                    <h3 >{country?.name}</h3>
                                    <p ><span className="bold">Population:</span> {country?.population.toLocaleString('en-US')}</p>
                                    <p ><span className="bold">Region:</span> {country?.region}</p>
                                    <p ><span className="bold">Capital:</span> {country?.capital}</p>
                                </article>
                            </NavLink>
                        </li>
                    ))
            :<NoCountriesResult/>
            }
        </ul>
    )
}

function NoCountriesResult() {
    return (
        <p className="noresults">No results found</p>
    )
}

export function Countries({countries, filteredBy}) {
    const hasCountries = countries?.length>0
    return (
            hasCountries ? <ListOfCountries countries={countries} filteredBy={filteredBy}/>
            : <NoCountriesResult/>   
    )
}