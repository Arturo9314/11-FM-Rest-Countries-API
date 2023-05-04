import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error404({messageError}) {
  const navigate = useNavigate();
  useEffect(()=>{
    const redirectTimeout = setTimeout(()=>{
      navigate('/')
    }, 4000);
    return ()=> clearTimeout(redirectTimeout)
  },[])
  return (
    <>
      <h2 className="noresultsHeading">Error 404</h2>
      <p className="noresults">Redirecting, {messageError}</p>
    </>
  )
}
