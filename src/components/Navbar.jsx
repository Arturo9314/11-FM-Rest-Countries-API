import React from 'react'
import DarkmodeBTN from './DarkmodeBTN'
export default function Navbar({darkMode, handleDarkMode}) {
    
    return (
        <nav>
            <h1>Where in the world?</h1>
            <DarkmodeBTN darkMode={darkMode} handleDarkMode={handleDarkMode}/>
        </nav>
    )
}
