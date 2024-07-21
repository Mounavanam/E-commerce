import React from "react";
import "./styles.scss";
import Logo from "./../../assets/Mango-logo.jpg";

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img src={Logo} alt="Main logo" />
                </div>
            </div>

        </header>
    );

};

export default Header;