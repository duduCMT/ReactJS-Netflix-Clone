import React from 'react'
import Button from '../Button'
import MainMovieInfo from '../MainMovieInfo'
import './styles.css'

export default function FeaturedMovie({ item }) {
  const firstDate = new Date(item.first_air_date)
  const genres = item.genres.map((value) => value.name)

  return (

    <section className='featured' style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured__vertical">
        <div className="featured__horizontal">
          <div className="featured__name">{item.original_name}</div>
          <div className="featured__info">
            <MainMovieInfo info={item} />
            <div className="featured__description">
              {item.overview}
            </div>
            <div className="featured__buttons">
              <Button title="► Assistir" type="watch" />
              <Button title="+ Minha Lista" type="list" />
            </div>
            <div className="featured__genres">
              <strong>Gêneros:</strong> {genres.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
