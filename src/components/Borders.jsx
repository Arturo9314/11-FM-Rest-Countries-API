import React from 'react'
import Border from './Border'
export default function Borders({borderCountries}) {
    return (
        <ul id='border-list'>
            {borderCountries?.map((code)=>
                <li key={code+'border'}>
                    <Border code={code}/>
                </li>
            )}
        </ul>
    )
}
