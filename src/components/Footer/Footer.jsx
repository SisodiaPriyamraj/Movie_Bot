import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="Footer">
            <div className="social-links">
                <a
                    href="https://discord.gg/trivia-assist-541228496761126933"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Discord
                </a>
                <a
                    href="https://www.instagram.com/live.bharatflix/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
            </div>
            <span></span>
            <p>Made with ❤️</p>
        </div>
    );
};

export default Footer;
