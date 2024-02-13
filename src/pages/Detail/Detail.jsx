import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    makeProviders,
    makeStandardFetcher,
    makeSimpleProxyFetcher,
    targets,
} from "@movie-web/providers";

import "./Detail.css";
import Player from "../../components/Player/Player";

const Detail = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [links, setLinks] = useState();
    const [stream, setStream] = useState();
    const { id } = useParams();

    const proxyUrl = import.meta.env.VITE_PROXY_URL;
    const myFetcher = makeStandardFetcher(fetch);
    const providers = makeProviders({
        fetcher: myFetcher,
        proxiedFetcher: makeSimpleProxyFetcher(proxyUrl, fetch),
        target: targets.BROWSER,
    });

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [id]);

    const getLinks = (details) => {
        const media = {
            type: "movie",
            title: details.title,
            releaseYear: details.release_date.slice(0, 4),
            tmdbId: details.id,
        };

        const output = providers
            .runAll({
                media: media,
            })
            .then((res) => {
                console.log(res);
                setStream(res.stream);
            });

        const query = { query: details.title };
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/search`, query)
            .then((res) => {
                console.log(res.data.res);
                let dlinks = [];
                for (let i = 0; i < 5; i++) {
                    if (i < res.data.res.length) {
                        const query = { query: res.data.res[i].link };
                        axios
                            .post(
                                `${
                                    import.meta.env.VITE_BACKEND_URL
                                }/api/download`,
                                query
                            )
                            .then((res) => {
                                if (res.data.res.length) {
                                    dlinks = dlinks.concat(res.data.res);
                                    console.log(dlinks, links);
                                    setLinks(dlinks);
                                }
                            });
                    }
                }
                console.log(links);
            });
    };

    const getData = () => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${
                    import.meta.env.VITE_API_KEY
                }&language=en-IN&page=1`
            )
            .then((res) => {
                setMovie(res.data);
                getLinks(res.data);
            });
    };
    return (
        <div className="movie">
            <div className="movieIntro">
                <img
                    className="movieBackdrop"
                    src={`https://image.tmdb.org/t/p/original${
                        currentMovieDetail
                            ? currentMovieDetail.backdrop_path
                            : ""
                    }`}
                />
            </div>
            <div className="movieDetail">
                <div className="movieDetailLeft">
                    <div className="posterBox">
                        <img
                            className="poster"
                            src={`https://image.tmdb.org/t/p/original${
                                currentMovieDetail
                                    ? currentMovieDetail.poster_path
                                    : ""
                            }`}
                        />
                    </div>
                </div>
                <div className="movieDetailRight">
                    <div className="movieDetailRightTop">
                        <div className="movieName">
                            {currentMovieDetail ? currentMovieDetail.title : ""}
                        </div>
                        <div className="movieTagline">
                            {currentMovieDetail
                                ? currentMovieDetail.tagline
                                : ""}
                        </div>
                        <div className="movieRating">
                            {currentMovieDetail
                                ? currentMovieDetail.vote_average
                                : ""}{" "}
                            <i className="fas fa-star" />
                            <span className="voteCount">
                                {currentMovieDetail
                                    ? "(" +
                                      currentMovieDetail.vote_count +
                                      ") votes"
                                    : ""}
                            </span>
                        </div>
                        <div className="movieRuntime">
                            {currentMovieDetail
                                ? currentMovieDetail.runtime + " mins"
                                : ""}
                        </div>
                        <div className="ReleaseDate">
                            {currentMovieDetail
                                ? "Release date: " +
                                  currentMovieDetail.release_date
                                : ""}
                        </div>
                        <div className="Genres">
                            {currentMovieDetail && currentMovieDetail.genres
                                ? currentMovieDetail.genres.map((genre, id) => (
                                      <span
                                          className="moviegenre"
                                          id={genre.id}
                                          key={id}
                                      >
                                          {genre.name}
                                      </span>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <div className="movieDetailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>
                            {currentMovieDetail
                                ? currentMovieDetail.overview
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="movieLinks">
                {stream && <Player stream={stream} />}
            </div>
            <div className="movieLinks">
                <div className="movieHeading">Download Links</div>
                {links &&
                    links.map((link, index) => (
                        <a
                            href={link.link}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                            key={index}
                        >
                            <p>
                                <span className="movieHomeButton movieButton">
                                    {link.title}{" "}
                                    <i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    ))}
            </div>
            <div className="movieHeading">Production companies</div>
            <div className="movieProduction">
                {currentMovieDetail &&
                    currentMovieDetail.production_companies &&
                    currentMovieDetail.production_companies.map(
                        (company, id) => (
                            <div key={id}>
                                {company.logo_path && (
                                    <span className="productionCompanyImage">
                                        <img
                                            className="productionComapany"
                                            src={
                                                "https://image.tmdb.org/t/p/original" +
                                                company.logo_path
                                            }
                                        />
                                        <span>{company.name}</span>
                                    </span>
                                )}
                            </div>
                        )
                    )}
            </div>
        </div>
    );
};

export default Detail;
