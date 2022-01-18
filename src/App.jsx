import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import MovieRow from './components/MovieRow'
import { getHomeList, getMovieInfo } from './services/Tmdb'

import './App.css'

import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import DetailsModal from './components/DetailsModal'

Modal.setAppElement('#root')

export default function App() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [modalMovie, setModalMovie] = useState(false)
  const [itemModalMovie, setItemModalMovie] = useState(null)

  setTimeout(
    () => setShowLoading(false),
    1500
  )

  useEffect(() => {
    async function loadAll() {
      let list = await getHomeList()
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')[0]
      let randomChosen = Math.floor(Math.random() * (originals.items.results.length))
      let chosen = originals.items.results[randomChosen]
      let chosenInfo = await getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    function scrollListener() {
      setBlackHeader(window.scrollY > 10)
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  function handleOpenMovieModal(item) {
    setItemModalMovie(item)
    setModalMovie(true)
  }

  function handleCloseMovieModal(){
    setModalMovie(false)
  }

  return (
    <div className='page'>
      <Header black={blackHeader} />

      { movieList.length !== 0 && !showLoading ?
        <>
          {featuredData && <FeaturedMovie item={featuredData} />}

          <section className="lists">
            {movieList.map(({ title, items }, key) => (
              <MovieRow key={key} title={title} items={items} onClickItem={handleOpenMovieModal} />
            ))}
          </section>

          <Footer />
          <DetailsModal isOpen={modalMovie} closeModal={handleCloseMovieModal} item={itemModalMovie}/>
        </>
        :
        <div className='loading__area'> <Loading /> </div>
      }
    </div>
  )
}
