import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";

import "./MovieList.css";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);

    const { type } = useParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${
                    type ? type : "popular"
                }?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`
            )
            .then((res) => setMovieList(res.data.results));
    };

    return (
        <div className="MovieList">
            <div className="CatTitle">
                {(type ? type : "POPULAR").toUpperCase()}
            </div>
            <div className="CardList">
                {movieList.map((movie, id) => (
                    <Card movie={movie} key={id} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
