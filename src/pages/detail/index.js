import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// const mock = {
//     "Title": "The Shawshank Redemption",
//     "Year": "1994",
//     "Rated": "R",
//     "Released": "14 Oct 1994",
//     "Runtime": "142 min",
//     "Genre": "Drama",
//     "Director": "Frank Darabont",
//     "Writer": "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
//     "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
//     "Plot": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
//     "Language": "English",
//     "Country": "USA",
//     "Awards": "Nominated for 7 Oscars. Another 21 wins & 36 nominations.",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "9.3/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "90%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "80/100"
//         }
//     ],
//     "Metascore": "80",
//     "imdbRating": "9.3",
//     "imdbVotes": "2,285,104",
//     "imdbID": "tt0111161",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "N/A",
//     "Production": "Columbia Pictures, Castle Rock Entertainment",
//     "Website": "N/A",
//     "Response": "True"
// }
function DetailPage(props) {
    const { id } = useParams()
    const [mock, setMock] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const handleImgEmpty = img => {
        if (img === 'N/A') return 'http://fpoimg.com/300x200?text=Poster%20Not%20Found'
        return img
    }

    const handleStringArray = string => {
        return string.split(',')
    }
    const img_url = mock !== null ? handleImgEmpty(mock.Poster) : null
    const genre = mock !== null ? handleStringArray(mock.Genre) : null
    const actor = mock !== null ? handleStringArray(mock.Actors) : null
    const writer = mock !== null ? handleStringArray(mock.Writer) : null
    const lang = mock !== null ? handleStringArray(mock.Language) : null

    useEffect(() => {
        setLoading(true);
        const getDetail = async () => {
            const url = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=faf7e5bb`)
            const response = await url.json()
            return response
        }
        getDetail().then(resp => {
            setMock(resp)
            setLoading(false)
        })

    }, [id]);

    if (isLoading || mock === []) {
        return (
            <div className="detail">
                <div className="loading">
                    <img className="loading" alt="loading" src="/assets/images/loading.gif" />
                    <h3>Searching movies detail..</h3>
                </div>
            </div>
        )
    }
    return (
        <div className="detail">
            <div className="detail__top">
                <div className="detail__top__left">
                    <img src={img_url} className="detail-img" alt="..." />
                    <div className="movie-info">
                        <div>
                            <div className="info-1">
                                <span className="title">{mock.Title}</span>
                                <span className="year">({mock.Year}) </span>
                            </div>

                            <div className="info-2">
                                <span className="rated">{mock.Rated}</span>
                                <ul className="genre-list">
                                    {genre.map((value, index) => (
                                        <li key={index} className="genre">{value}</li>
                                    ))}
                                </ul>
                                <span className="runtime">{mock.Runtime}</span>
                            </div>
                        </div>


                        <div className="info-3">
                            <div className="subinfo">
                                <h4 className="title">Released</h4>
                                <p className="subtitle date">{mock.Released}</p>
                            </div>
                            <div className="subinfo">
                                <h4 className="title">Production</h4>
                                <p className="subtitle">{mock.Production}</p>
                            </div>
                            <div className="subinfo">
                                <h4 className="title">Country</h4>
                                <p className="subtitle">{mock.Country}</p>
                            </div>
                        </div>

                        <div className="info-4">
                            <h4 className="title">Plot</h4>
                            <p className="subtitle">{mock.Plot}</p>
                        </div>
                    </div>
                </div>
                <div className="detail__top__right">
                    <div className="top__right__container">
                        <h4 className="score-title">Rating</h4>
                        <ul className="movie-score">
                            <li className="rating">
                                <h4>{mock.imdbVotes}</h4>
                                <h5>IMDB Votes</h5>
                            </li>
                            <li className="rating">
                                <h4>{mock.imdbRating}</h4>
                                <h5>IMDB Rating</h5>
                            </li>
                            <li className="rating">
                                <h4>{mock.Metascore}</h4>
                                <h5>Metascore</h5>
                            </li>
                            {mock.Ratings.map((value, index) => (
                                <li className="rating">
                                    <h4>{value.Value}</h4>
                                    <h5>{value.Source}</h5>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="top__right__container">
                        <h4 className="score-title">Awards</h4>
                        <h4 className="award">{mock.Awards}</h4>
                    </div>
                    <div className="top__right__container">
                        <h4 className="score-title">Other</h4>
                        <ul className="movie-score">
                            <li className="media">
                                <h4>{mock.BoxOffice}</h4>
                                <h5>Box Office</h5>
                            </li>
                            <li className="media">
                                <h4>{mock.Website}</h4>
                                <h5>Website</h5>
                            </li>
                            <li className="media">
                                <h4>{mock.DVD}</h4>
                                <h5>DVD</h5>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="detail__bottom">
                <div className="section left">
                    <h4>Language</h4>
                    <ul className="list-2">
                        {lang.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
                <div className="section middle-left">
                    <h4>Director</h4>
                    <ul className="list-1 ">
                        <li>{mock.Director}</li>
                    </ul>
                </div>
                <div className="section middle-right">
                    <h4>Writers</h4>
                    <ul className="list-3">
                        {writer.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
                <div className="section right">
                    <h4>Actors</h4>
                    <ul className="list-3">
                        {actor.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;