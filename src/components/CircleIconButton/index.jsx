import Icon from '@material-ui/core/Icon'
import React from 'react'
import './styles.css'

export default function CircleIconButton({iconName, size}) {
  return (
    <button className='circle-button'>
      <Icon className='circle-button__icon' style={{fontSize: size ? size : 24}}>{iconName}</Icon>  
    </button>
  )
}
