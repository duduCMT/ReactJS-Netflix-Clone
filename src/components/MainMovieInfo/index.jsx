import React from 'react'
import './styles.css'

export default function MainMovieInfo({info, fontSize}) {
  const firstDate = new Date(info.first_air_date)
  const relevance = info.vote_average * 10

  return (
    <div className='mmi' style={{
      fontSize: fontSize ? fontSize : 16
    }}>
      <div className="mmi__relevante">
        {relevance}% relevante
      </div>
      <div className="mmi__year">
        {firstDate.getFullYear()}
      </div>
      <div className="mmi__seasons">
        {info.number_of_seasons} Temporada{info.number_of_seasons !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
