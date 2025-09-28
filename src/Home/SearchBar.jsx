import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieByName } from "../api/tmdb";
import "./Home.css";
import "./Results.css";

export default function SearchBar({ setIsSearching }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasSearch, setHasSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setPage(1); // Reset page to 1 for new search
        setHasSearch(true); // Set hasSearch to true when starting a search
        setResults([]); // Clear previous results immediately
        setIsSearching(true);

        setTimeout(async () => {
            try {
                const data = await getMovieByName(1, query);
                setResults(data.results || []);
            } catch (err) {
                console.error("Error while searching:", err);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    const loadMore = async () => {
        const nextPage = page + 1;
        setIsLoading(true);

        setTimeout(async () => {
            try {
                const data = await getMovieByName(nextPage, query);
                setResults((prev) => [...prev, ...(data.results || [])]);
                setPage(nextPage);
            } catch (err) {
                console.error("Error while loading more:", err);
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        if (!e.target.value.trim()) {
            // Only reset when input is completely empty
            setPage(1);
            setHasSearch(false);
            setResults([]);
            setIsLoading(false);
        }
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="🔍 Type to browse for movies..."
                        value={query}
                        onChange={handleQueryChange}
                    />
                </form>
            </div>

            <div className="results">
                {/* Show loader only when actually loading and no results yet */}
                {isLoading && results.length === 0 && (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <div className="loader-text loader-dots">Searching for movies</div>
                    </div>
                )}

                {/* Show no results only when search completed, not loading, and no results */}
                {hasSearch && results.length === 0 && !isLoading && (
                    <div className="no-results">
                        <span className="emoji">🎬</span>
                        <div className="title">No movies found</div>
                        <div className="subtitle">Try searching with different keywords or check your spelling</div>
                    </div>
                )}

                {/* Show results */}
                {results.map((m) => (
                    <div key={m.id} className="card">
                        <img
                            onClick={() => navigate(`/movie/${m.id}`)}
                            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                            alt={m.title}
                        />
                        <p>{m.title}</p>
                    </div>
                ))}
            </div>

            {/* Load more button - only show when we have results */}
            {results.length > 0 && (
                <button
                    onClick={loadMore}
                    className="more-btn"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "See more results"}
                </button>
            )}
        </div>
    );
}