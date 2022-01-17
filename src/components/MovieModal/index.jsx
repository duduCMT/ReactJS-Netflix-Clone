import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { getMovieInfo } from '../../services/Tmdb'
import Button from '../Button'
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
      console.log(item)
      let completeItemInfo = await getMovieInfo(item.id, 'tv')
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
              <div className='movie-modal__buttons'>
                <Button title="► Assistir" type="watch" />
              </div>
            </div>
          </section>
          
          <h2>{movieInfo.name}</h2>
          <p>Modal Body</p>
          <button onClick={() => closeModal()}>Close</button>
        </div>
        : <div className='movie-modal__loading'><Loading /></div>
      }
      
    </Modal>  
  )
}
