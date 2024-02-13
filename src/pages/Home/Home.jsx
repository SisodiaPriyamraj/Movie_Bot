import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieList from "../../components/MovieList/MovieList";

const Home = () => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${
                    import.meta.env.VITE_API_KEY
                }&language=en-US&page=1`
            )
            .then((res) => setPopular(res.data.results));
    }, []);

    return (
        <div className="Home">
            <div className="posterMain">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                    draggable="false"
                >
                    {popular.slice(0, 13).map((movie, id) => (
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={`/movie/${movie.id}`}
                            key={id}
                        >
                            <div className="posterImage">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${
                                        movie && movie.backdrop_path
                                    }`}
                                />
                            </div>
                            <div className="posterOverlay">
                                <div className="posterTitle">
                                    {movie ? movie.original_title : ""}
                                </div>
                                <div className="posterRuntime">
                                    {movie ? movie.release_date : ""}
                                    <span className="rating">
                                        {movie ? movie.vote_average : ""}{" "}
                                        <i className="fas fa-star"></i>{" "}
                                    </span>
                                </div>
                                <div className="posterDescription">
                                    {movie ? movie.overview : ""}
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <MovieList />
            </div>
        </div>
    );
};

export default Home;
