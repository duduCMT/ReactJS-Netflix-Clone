import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { getMovieInfo } from '../../services/Tmdb'
import Button from '../Button'
import CircleIconButton from '../CircleIconButton'
import CloseButton from '../CloseButton'
import Loading from '../Loading'

import './styles.css'

export default function MovieModal({isOpen, closeModal, item}) {
  const [movieInfo, setMovieInfo] = useState(null)
  const [showLoading, setShowLoading] = useState(true)

  if(isOpen){
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto' 
  }

  useEffect(() => {
    async function loadCompleteItem(){
      let completeItemInfo = await getMovieInfo(item.id, 'tv')
      console.log(completeItemInfo)
      setMovieInfo(completeItemInfo)
    }

    if(item){
      loadCompleteItem()
    }

    setTimeout(
      () => setShowLoading(false), 
      2000
    )
  }, [item])

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="movie-modal"
      overlayClassName="movie-modal__overlay"
      shouldFocusAfterRender={false}
    >
      {
        movieInfo && !showLoading ? 
        <div className='movie-modal__content'>
          <section className='movie-modal__image' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`
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
          
          <section className='movie-modal__infoarea'>
            <h2 className='movie-modal__title'>{movieInfo.name}</h2>
            <p className='movie-modal__overview'>{movieInfo.overview}</p>
          </section>
          
        </div>
        : <div className='movie-modal__loading'><Loading /></div>
      }
      
    </Modal>  
  )
}
