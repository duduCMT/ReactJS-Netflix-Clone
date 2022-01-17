import React, { useEffect, useState } from 'react'
import MovieRow from './components/MovieRow'
import { getHomeList, getMovieInfo } from './services/Tmdb'

import './App.css'

import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

export default function App() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  setTimeout(
    () => setShowLoading(false),
    2000
  )


  useEffect(() => {
    async function loadAll(){
      let list = await getHomeList()
      setMovieList(list)
      console.log(list)

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

  return (
    <div className='page'>
      <Header black={blackHeader} />

      {movieList.length != 0 && !showLoading ?
        <>
          {featuredData && <FeaturedMovie item={featuredData} /> }
          
          <section className="lists">
            {movieList.map(({title, items}, key) => (
              <MovieRow key={key} title={title} items={items}/>
            ))}
          </section>

          <Footer />
        </>
      :
        <div className='loading__area'>
          <Loading />
        </div>
      }
    </div>
  )
}
