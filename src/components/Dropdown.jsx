import React, { useRef, useState } from 'react'
import '../styles/dropdown.css'
import { ReactComponent as ChevronDown } from '../assets/chevron-down-solid.svg';
import { ReactComponent as ChevronUp } from '../assets/chevron-up-solid.svg';

export default function Dropdown({onFiltered}) {
    const [dropdown, setDropdown] = useState(false)
    const [filter, setFilter]= useState('Filter by Region')
    const selectedButtonRef = useRef(null);
    
    const icon = dropdown? <ChevronUp/> : <ChevronDown/>
    
    const menuOpen = {translate: '0 0', opacity: '1', visibility: 'visible'}
    const menuClose = {translate: '-10px 0', opacity: '0', visibility: 'hidden'}

    const toogleDropdown = ( )=>{
        setDropdown(!dropdown)
    };
    
    const handleMenuButtonClicked = (event)=>{
        const choice = event.target.textContent
        if(choice === selectedButtonRef.current){
            return
        }
        setFilter(choice)
        selectedButtonRef.current = choice
        onFiltered(choice)
        toogleDropdown()
    }

    return (
        <div className='split-button'>
            <button >
                {filter}
            </button>
            <button id='dropIcon' onClick={toogleDropdown}>
                {icon}
            </button>
            <div id='menu' className='menu' style={dropdown?menuOpen:menuClose}>
                <button onClick={handleMenuButtonClicked}>
                    Africa
                </button>
                <button onClick={handleMenuButtonClicked}>
                    America
                </button>
                <button onClick={handleMenuButtonClicked}>
                    Asia
                </button>
                <button onClick={handleMenuButtonClicked}>
                    Europe
                </button>
                <button onClick={handleMenuButtonClicked}>
                    Oceania
                </button>
            </div>
        </div>
    )
}
