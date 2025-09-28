const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const HEADER = import.meta.env.VITE_TMDB_API_HEADER;
const BASE = "https://api.themoviedb.org/3";

async function fetchFromTMDB(path, params = {}) {
    const url = new URL(`${BASE}${path}`);
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    );

    const res = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: HEADER,
        },
    });

    if (!res.ok) {
        throw new Error(`TMDB error: ${res.status}`);
    }

    return res.json();
}

export function getNowPlaying(page = 1, language = "fr-FR") {
    return fetchFromTMDB("/movie/now_playing", { page, language });
}

export function getTopRated(page = 1, language = "fr-FR") {
    return fetchFromTMDB("/movie/top_rated", { page, language });
}

export function getMovieByName(page, query) {
    return fetchFromTMDB(`/search/movie?query=${ encodeURIComponent(query) }&page=${encodeURIComponent(page)}`);
}

export function getMovieDetails(movie_id) {
    return fetchFromTMDB(`/movie/${ encodeURIComponent(movie_id) }?language=en-US`);
}

