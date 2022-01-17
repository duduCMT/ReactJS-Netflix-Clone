import React from 'react'
import Button from '../Button'
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
            <div className='featured__info-header'>
              <div className="featured__points">
                {item.vote_average} pontos
              </div>
              <div className="featured__year">
                {firstDate.getFullYear()}
              </div>
              <div className="featured__seasons">
                {item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}
              </div>
            </div>
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
