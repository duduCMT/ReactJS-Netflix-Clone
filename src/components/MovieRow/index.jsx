import React, { useState } from 'react'
import './styles.css'
import NavigationBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigationNextIcon from '@material-ui/icons/NavigateNext'

export default function MovieRow({ title, items }) {
  const [scrollX, setScrollX] = useState(0)

  function handleLeftArrow() {
    let x = scrollX + Math.round(window.innerWidth / 2)
    if(x > 0){
      x = 0
    }
    setScrollX(x)
  }

  function handleRightArrow() {
    let x = scrollX - Math.round(window.innerWidth / 2)
    let listW = items.results.length * 150 
    if((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60
    }
    setScrollX(x)
  }

  return (
    <div className='movieRow'>
      <h2 className='movieRow__title'>{title}</h2>
      <div className="movieRow__left" onClick={handleLeftArrow}>
        <NavigationBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow__right" onClick={handleRightArrow}>
        <NavigationNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow__list-area">
        <div className='movieRow__list' style={{
          marginLeft: scrollX,
          width: items.results.length * 150,
        }}>
          {
            items.results.length > 0 &&
            items.results.map(({ poster_path, original_title }, key) => (
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
