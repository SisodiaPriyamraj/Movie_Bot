import React, { useEffect, useState } from "react";

const Player = ({ stream }) => {
    const [url, setUrl] = useState();
    useEffect(() => {
        if (stream.type === "file") {
            setUrl(
                stream.qualities[
                    Object.keys(stream.qualities)[
                        Object.keys(stream.qualities).length - 1
                    ]
                ].url
            );
        } else if (stream.type === "hls") {
            setUrl(stream.playlist);
        }
    }, [stream]);

    return (
        <div>
            <video controls width="70%">
            <source src={url} type="application/x-mpegURL"/>
            </video>
        </div>
    );
};

export default Player;
