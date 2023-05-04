import './styles/App.css'
import { useCountries } from './hooks/useCountries';
import { Countries } from './components/Countries';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';
import { useState,useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import {ReactComponent as IconSearch} from './assets/magnifying-glass-solid.svg'
import Dropdown from './components/Dropdown';
import { Route, Routes } from 'react-router-dom';
import { DetailsCountry } from './components/Details';
import Error404 from './components/Error404';
import { DotWave } from '@uiball/loaders'


function App() {

  const themeSelection = localStorage.getItem('darkmode') ? JSON.parse(localStorage.getItem('darkmode')) : false

  const { search, updateSearch, error } = useSearch()
  const { countries, loading ,getCountries, error2 } = useCountries({search})
  const [darkMode, setDarkMode]= useState(themeSelection)
  const [ filteredBy, setFilteredBy ] = useState(null)
  
  const borderColor = darkMode? 'hsl(0, 0%, 58%)': 'hsl(200, 15%, 80%)'
  const bodyColor = darkMode? 'hsl(207, 26%, 17%)': 'hsl(0, 0%, 98%)'
  const elementsColor = darkMode? 'hsl(209, 23%, 22%)': 'hsl(0, 0%, 100%)'
  const textColor = darkMode? 'hsl(0, 0%, 100%)': 'hsl(200, 15%, 8%)'
  const inputColor = darkMode? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 52%)'
  document.documentElement.style.setProperty('--border-color', borderColor);
  document.documentElement.style.setProperty('--body-color', bodyColor);
  document.documentElement.style.setProperty('--elements-color', elementsColor);
  document.documentElement.style.setProperty('--text-color', textColor);
  document.documentElement.style.setProperty('--input-color', inputColor);
  
  const debounceGetCountries = useCallback(debounce(search=>{
    getCountries({ search })
  }, 500)
  ,[getCountries])

  const handleFiltered = (filter)=>{
    setFilteredBy(filter)
  }

  const handleChange = (event)=>{
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetCountries(newSearch)
  }

  const handleDarkMode = ()=>{
    setDarkMode(!darkMode)
  }

  useEffect(()=>{
    localStorage.setItem('darkmode', darkMode.toString())
  }, [darkMode])

  return (
    <>
      <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode}/>
      <div className='page'>
      <Routes>
        <Route path='*' element={
          <Error404 messageError={'page not found'}/>
        }/>
        <Route path='/' element={
          <>
            <header id='homeheader'>
              <form className='form' >
                <input id='inputSearch' onChange={handleChange} value={search} placeholder='Search for a country...' />
                <IconSearch id='inputIcon'/>
                {error? <p style={{color: 'red'}}>{error}</p>: error2?<p style={{color: 'red'}}>{error2}</p> : '' }
              </form>
              <Dropdown filteredBy={filteredBy} onFiltered={handleFiltered}/>
            </header>
            <main id='main-home'>
              {
                loading ? <div className='loading'><DotWave 
                size={60}
                speed={1.5}
                color='var(--text-color)'
               /></div> : <Countries countries={countries} filteredBy={filteredBy} />
              }
            </main>
          </>
        }/>
        <Route path='/country/:name' element={
          <DetailsCountry />
        }/>
      </Routes>
      </div>
    </>
  )
}

export default App
