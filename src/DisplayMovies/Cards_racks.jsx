import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getNowPlaying, getTopRated} from "../api/tmdb";
import './Grid.css'

export default function MoviesSection() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [top, setTop] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNowPlaying()
            .then((data) => setNowPlaying(data.results))
            .catch((err) => console.error(err));

        // Fetch Upcoming
        getTopRated()
            .then((data) => setTop(data.results))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="all-content">
            <div className="now-playing">
                <h2>🎬 Now Playing</h2>
                <br />
                <div className="grid">
                    {nowPlaying.map((m) => (
                        <div key={m.id} className="card">
                            <img onClick={() => navigate(`/movie/${m.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                alt={m.title}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="now-playing">
                <h2>🔝 Top Rated</h2>
                <br />
                <div className="grid">
                    {top.map((m) => (
                        <div key={m.id} className="card">
                            <img onClick={() => navigate(`/movie/${m.id}`)}
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                alt={m.title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

