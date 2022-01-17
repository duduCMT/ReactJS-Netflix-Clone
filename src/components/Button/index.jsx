import React from 'react'
import './styles.css'

export default function Button({title, type, onClick}) {
  return (
    <button className={`featured__${type}-button`} onClick={onClick}>
      {title}
    </button>
  )
}
