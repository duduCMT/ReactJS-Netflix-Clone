import React from 'react'
import './styles.css'
import user from '../../assets/img/netflix-avatar.png'

export default function Header({black}) {
  return (
    <header className={`header ${ black ? 'header--black' : ''}`}>
      <a href="/">
        <img
          className='header__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
          alt='Logo da Netflix'
        />
      </a>

      <a href="/">
        <img
          className='header__user'
          src={user}
          alt='Avatar Azul Sorrindo'
        />
      </a>
    </header>
  )
}
