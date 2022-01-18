const API_KEY = process.env.REACT_APP_API_KEY
const API_BASE = process.env.REACT_APP_API_BASE
const SOLICITATION_PARAMS = `language=pt-BR&api_key=${API_KEY}`

async function basicFetch(endpoint){
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json()
  return json
}

async function getHomeList(){
  return [
    {
      slug: 'originals',
      title: 'Séries Populares',
      items: await basicFetch(`/discover/tv?with_network=213&${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'trending',
      title: 'Recomendados para Você',
      items: await basicFetch(`/trending/all/week?${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated?${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28&${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35&${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27&${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await basicFetch(`/discover/movie?with_genres=10749&${SOLICITATION_PARAMS}`)
    },
    {
      slug: 'documentary',
      title: 'Documentários',
      items: await basicFetch(`/discover/movie?with_genres=99&${SOLICITATION_PARAMS}`)
    },
  ]
}

async function getMovieInfo(id, type){
  return await basicFetch(`/${type}/${id}?${SOLICITATION_PARAMS}`)
}

export {
  getHomeList,
  getMovieInfo,
}