import React, { useEffect, useRef } from 'react'
import '../styles/flag.css'
export default function Flag({srcFlag, flagDescription}) {
  const flagElement = useRef(null)
  
  useEffect(()=>{
    const el = flagElement.current
    const height = el.clientHeight
    const width = el.clientWidth
    el.addEventListener('mousemove', (event)=>{
      const {layerX, layerY} = event
      const yRotation = ((layerX - width / 2) / width) * 20
      const xRotation = ((layerY - height / 2) / height)*20
      const str = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
      el.style.transform = str
    })
    el.addEventListener('mouseout', ()=>{
      el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })
  },[])

  return (
    <figure ref={flagElement} id="flag">
        <img id="details-flag" src={srcFlag} alt={flagDescription}/>
    </figure> 
  )
}
