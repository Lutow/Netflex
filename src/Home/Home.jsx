import React, {useState} from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar.jsx';
import Cards from '../DisplayMovies/Cards_racks.jsx';
import SearchBar from "./SearchBar.jsx";

export const Home = () => {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className='home'>
            <Navbar />
            <div className='home-content'>
                <SearchBar setIsSearching={setIsSearching} />
                {!isSearching && (
                    <div className='movie-rows'>
                        <Cards />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;