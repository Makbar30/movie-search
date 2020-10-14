import React from 'react'
import { Link } from 'react-router-dom'
const MovieCard = props => {

    const { objMovie } = props

    const img_url = objMovie.Poster === 'N/A' ? 'http://fpoimg.com/300x200?text=Poster%20Not%20Found' : objMovie.Poster
    return (
        <Link to={`/detail/${objMovie.imdbID}`}>
            <div className="card movie_card">
                <img src={img_url} className="card-img-top" alt="..." />
                <span className="movie_info">{objMovie.Year}</span>
                <h5 className="card-title">{objMovie.Title}</h5>
            </div>
        </Link>

    )
}

export default MovieCard