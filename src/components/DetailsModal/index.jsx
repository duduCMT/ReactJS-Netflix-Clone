import { Icon } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { getMovieInfo } from '../../services/Tmdb'
import Button from '../Button'
import CircleIconButton from '../CircleIconButton'
import CloseButton from '../CloseButton'
import Loading from '../Loading'
import MainMovieInfo from '../MainMovieInfo'

import './styles.css'

export default function DetailsModal({isOpen, closeModal, item}) {
  const [movieInfo, setMovieInfo] = useState(null)
  const [showLoading, setShowLoading] = useState(true)
  const [errorMenssage, setErrorMenssage] = useState(null)

  if(isOpen){
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto' 
  }

  

  setTimeout(
    () => setShowLoading(false), 
    2000
  )

  useEffect(() => {
    async function loadCompleteItem(){
      let completeItemInfo = await getMovieInfo(item.id, 'tv')
  
      if(completeItemInfo.success === false){
        completeItemInfo = await getMovieInfo(item.id, 'movie')
  
        if(completeItemInfo.success !== undefined && completeItemInfo.success === false){
          setErrorMenssage('Informações Indisponíveis.')
          return;
        }
      } 
      setMovieInfo(completeItemInfo)
    }

    if(item){
      loadCompleteItem()
    }

  }, [isOpen, item])

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="movie-modal"
      overlayClassName="movie-modal__overlay"
      onAfterClose={() => {
        setErrorMenssage(null)
        setMovieInfo(null)
        setShowLoading(true)
      }}
      shouldFocusAfterRender={false}
    >
      {
        movieInfo && !showLoading ? 
        <div className='movie-modal__content'>
          <section className='movie-modal__image' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path ? item.backdrop_path : item.poster_path})`
          }}>
            <div className='movie-modal__image-gradient'>
              <CloseButton className="movie-modal__close" onClick={() => closeModal()}/>
              <div className='movie-modal__buttons'>
                <Button title="► Assistir" type="watch" />
                <CircleIconButton iconName="add"/>
                <CircleIconButton iconName="thumb_up_off_alt" size={20}/>
                <CircleIconButton iconName="thumb_down_off_alt" size={20}/>
              </div>
            </div>
          </section>
          
          <section style={{display: "flex", paddingLeft: 32, paddingRight: 32, gap: 16}}>
            <section className='movie-modal__infoarea'>
              <h2 className='movie-modal__title'>{item.name ? item.name : item.title}</h2>
              <MainMovieInfo info={item} fontSize={14} />
              <p className='movie-modal__overview'>{item.overview ? item.overview : movieInfo.overview}</p>
            </section>

            <aside className='movie-modal__castingarea'>
              <p>
                <span>Gêneros: </span>
                {movieInfo.genres.map((value) => value.name).join(', ')}.
              </p>

              <p>
                <span>Produzido por: </span>
                {movieInfo.production_companies.map((value) => value.name).join(', ')}.
              </p>
            </aside>
          </section>
          
          
        </div>
        : <div className='movie-modal__loading'>
          { errorMenssage 
          ? <section className='movie-modal__error'>
              <CloseButton className='movie-modal__close' onClick={() => closeModal()}/>
              <Icon style={{fontSize: 128, color: "#BB1D24"}}>error_outline</Icon>
              <h2>{errorMenssage}</h2>
            </section>
          : <Loading />}
        </div>
      }
      
    </Modal>  
  )
}
