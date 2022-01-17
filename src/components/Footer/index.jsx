import React from 'react'
import './styles.css'

export default function Footer() {
  return (
    <footer className='footer'>
      <h1 className='footer__title'>Netflix Clone (Direitos de imagem para Netflix)</h1>
      <ul className='footer__list'>
        <li>
          Desenvolvido para portifólio de Eduardo L. Costa.
        </li>
        <li>
          <a className='footer__link' href="https://www.themoviedb.org/">
            API para consumo de Filmes e Séries (TMDB)
          </a>
        </li>
        <li>
          <a className='footer__link' href="https://github.com/duduCMT">
            GitHub do Desenvolvedor
          </a>
        </li>
        <li>
          <a className='footer__link' href="https://www.linkedin.com/in/duducmt/">
            Linkedin do Desenvolvedor
          </a>
        </li>
      </ul>
    </footer>
  )
}
