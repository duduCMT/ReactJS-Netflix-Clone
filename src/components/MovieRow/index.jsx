import React from 'react'
import './styles.css'

export default function MovieRow({title, items}) {
  return (
    <div className='movieRow'>
      <h2 className='movieRow__title'>{title}</h2>
       <div className="movieRow__list-area">
          <div className='movieRow__list'>
            {
              items.results.length > 0 && 
              items.results.map(({poster_path, original_title}, key) => (
                <div className="movieRow__item" key={key}>
                  <img 
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`} 
                    alt={original_title} 
                    className='movieRow__image' 
                  />
                </div>
              ))
            }
          </div>
       </div>
    </div>
  )
}
