import { searchByCode, searchCountries, searchDetails } from '../services/countries';
import { useRef, useState, useCallback } from 'react';

export function useCountries({search}){
  const [countries, setCountries]= useState([])
  const [loading, setLoading] = useState(false)
  const [error2, setError] = useState(null)
  const previousSearch = useRef(search)

  const getCountries = useCallback(async({search})=>{
    if(search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newCountries = await searchCountries({search})
      setCountries(newCountries)
    } catch (e) {
      setError(e.message)
    }finally{
      setLoading(false)
    }
  },[])
  return { countries, loading ,getCountries, error2 }
}

export function useDetails({name}) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorDetails, setErrorDetails] = useState(null)
  const previousName = useRef(name)
  
  const getDetails = useCallback( async({name})=>{
    try {
      setLoading(true)
      setErrorDetails(null)
      previousName.current = name
      const newDetails = await searchDetails({name})
      setDetails(newDetails)
    } catch (e) {
      setErrorDetails(e.message)
    }finally{
      setLoading(false)
    }
  },[])
  
  return {details, loading, getDetails, errorDetails}
}

export function useBorders(){
  const [border, setBorder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorBorder, setErrorBorder]=useState(null)
  
  const getByCode = useCallback( async({code})=>{
    try{
      setLoading(true)
      setErrorBorder(null)
      const newBorder = await searchByCode({code})
      setBorder(newBorder)
    }catch(e){
      setErrorBorder(e.message)
    }finally{
      setLoading(false)
    }
  },[])
  return {border, loading, getByCode, errorBorder}
}