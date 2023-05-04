import React, { useEffect } from 'react'
import { useBorders } from '../hooks/useCountries'
import { DotSpinner } from '@uiball/loaders'

export default function Border({code}) {

    const {border, loading, getByCode, errorBorder} = useBorders();
    useEffect(()=>{
        getByCode({code})
    },[])
    return (
        <button className='border-btn' >
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
