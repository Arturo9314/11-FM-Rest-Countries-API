import React, { useEffect } from 'react'
import { useBorders } from '../hooks/useCountries'
import { DotSpinner } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'

export default function Border({code}) {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/country/${border}`)
    }
    const {border, loading, getByCode} = useBorders();
    useEffect(()=>{
        getByCode({code})
    },[])
    return (
        <button onClick={handleClick} className='border-btn' >
            { loading ? 
                <div className='loading'><DotSpinner 
                    size={10}
                    speed={0.9}
                    color='var(--text-color)'
               /></div>:
            border
            }
        </button>
    )
}
