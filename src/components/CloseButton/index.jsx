import React from 'react'
import './styles.css'
import CloseIcon from '@material-ui/icons/Close'

export default function CloseButton({className, onClick}) {
  return (
    <button className={`close-button ${className}`} onClick={onClick}>
      <CloseIcon />  
    </button>
  )
}
