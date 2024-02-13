import axios from "axios";
import React, { useState } from "react";

import "./Search.css";

const Search = () => {
    const [value, setValue] = useState("");

    const change = (e) => {
        setValue(e.target.value);

        axios
            .get(
                `https://api.themoviedb.org/3/search/tv?api_key=${
                    import.meta.env.VITE_API_KEY
                }&language=en-US&page=1&query=${value}`
            )
            .then((res) => {
                setSeries(res.data.results);
            });

        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=${
                    import.meta.env.VITE_API_KEY
                }&language=en-US&page=1&query=${value}`
            )
            .then((res) => {
                setMovies(res.data.results);
            });
    };

    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);

    return (
        <div className="Search">
            <div className="search-container">
                <div className="searchInner">
                    <input type="text" value={value} onChange={change} />
                </div>
                <div className="dropdown">
                    {series.slice(0, 5).map((seriess, id) => (
                        <div className="dropdownRow" key={id}>
                            <a href={`/series/${seriess.id}`}>{seriess.name}</a>
                        </div>
                    ))}
                    {movies.slice(0, 5).map((movie, id) => (
                        <div className="dropdownRow" key={id}>
                            <a href={`/movie/${movie.id}`}>{movie.title}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
