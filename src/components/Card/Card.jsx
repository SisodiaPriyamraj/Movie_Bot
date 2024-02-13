import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const loaded = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <div className="Cards CardLoading">
                    <Skeleton height={300} duration={2} />
                </div>
            ) : (
                <Link
                    to={`/movie/${movie.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <div className="Cards">
                        <img
                            className="CardsImg"
                            src={`https://image.tmdb.org/t/p/original${
                                movie ? movie.poster_path : ""
                            }`}
                            onLoad={loaded}
                        />
                        <div className="cardsOverlay">
                            <div className="cardTitle">
                                {movie ? movie.original_title : ""}
                            </div>
                            <div className="cardRuntime">
                                {movie ? movie.release_date : ""}
                                <span className="cardRating">
                                    {movie ? movie.vote_average : ""}
                                    <i className="fas fa-star" />
                                </span>
                            </div>
                            <div className="cardDesc">
                                {movie
                                    ? movie.overview.slice(0, 118) + "..."
                                    : ""}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Card;
