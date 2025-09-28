import React, { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {getMovieDetails} from "../api/tmdb.js";
import Navbar from "../Navbar/Navbar.jsx";
import './Details.css'

export const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getMovieDetails(id)
            .then(res => {setDetails(res)})
            .catch(err => {console.log(err)})
    }, [id]);

    if (!details) return <p>Loading...</p>;

    return (
        <div className="container">
            <Navbar />
            <div className="movie-details">
                <button onClick={() => navigate(`/`)} className="back-btn">
                    Back
                </button>
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} />
                </div>
                <div className="info-section">
                    <div className="title">
                        <h1 className="movie-title">{details.title}</h1>
                    </div>
                    <div className="meta">
                        <h3 className="year">{new Date(details.release_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            }
                        )}
                        </h3>
                    </div>
                    <div className="genres">
                        <h2>Genres: {details.genres.map(g => g.name).join(", ")}</h2>
                    </div>
                    <div className="rating">
                        <h2>IMDB Rating: <p>{details.vote_average}</p></h2>
                    </div>
                    <div className="movie-plot">
                        <h2>Plot</h2>
                        <p>{details.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;