import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../assets/arrow-left-solid.svg";
import '../styles/details.css'
import Borders from "./Borders";
import { useDetails } from "../hooks/useCountries";
import { DotWave } from '@uiball/loaders'
import Error404 from "./Error404";
import Flag from "./Flag";

export function DetailsCountry({handleFiltered}) {
    const {name} = useParams();
    const {details, loading, getDetails, errorDetails} = useDetails({name})
    const nullFiltered = ()=>{
        handleFiltered(null)
    }
    const altImg = details?.flagAlt
    useEffect(()=>{
        getDetails({name})
        return ()=>{
            nullFiltered()
        }
    },[name])
    return (
        <>
        <NavLink id="back-link" to='/'>
                <BackIcon id='back-icon'/>
                <p id="back-txt">Back</p>
        </NavLink>
        {   errorDetails? <Error404 messageError={'page not found'}/> :
            loading?
            <div className='loading'><DotWave 
                size={60}
                speed={1}
                color='var(--text-color)'
               /></div>
            :
            <main id="details-main">
                <Flag srcFlag={details?.flag} flagDescription={altImg}/>
                <article>
                    <header>
                        <h2 >{details?.name}</h2>
                    </header>
                    <div id="details-container">
                        {details?.nativeName?
                            <p id="details-native"><span className="bold">Native Name:</span> {details?.nativeName}</p>
                        : ''}
                        {details?.population?
                            <p id="details-population"><span className="bold">Population:</span> {details?.population.toLocaleString('en-US')}</p>
                        : ''}
                        {details?.region?
                            <p id="details-region"><span className="bold">Region:</span> {details?.region}</p>
                            :''}
                        {details?.subRegion?
                            <p id="details-subRegion"><span className="bold">Sub Region:</span> {details?.subRegion}</p>
                            :''}
                        {details?.capital?
                            <p id="details-capital"><span className="bold">Capital:</span> {details?.capital}</p>
                            :''}
                        {details?.topLevelDomain?
                            <p id="details-tld"><span className="bold">Top Level Domain:</span> {details?.topLevelDomain}</p>
                            :''}
                        {details?.currencies?
                            <p id="details-currencies"><span className="bold">Currencies:</span> {(details?.currencies).join(", ")}</p>
                            :''}
                        {details?.languages?
                            <p id="details-languajes"><span className="bold">Languages:</span> {(details?.languages).join(", ")}</p>
                            :''}
                    </div>
                    <footer>
                        {details?.borderCountries &&
                            <>
                            <p id="details-border" ><span className="bold">Border Countries:</span></p>
                            <Borders borderCountries={details?.borderCountries}/>
                            </>
                        }
                    </footer>
                </article>
            </main>
        }
        </>
    )
}