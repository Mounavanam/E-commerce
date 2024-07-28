import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Logo from "./../../assets/Mango-logo.jpg";
import { auth } from "./../../firebase/utils";

const Header = props => {
    //destructure currentuser
    const { currentUser } = props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Main logo" />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <span onClick={() => auth.signOut()}>LogOut</span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>

                    )}
                </div>
            </div>
        </header>

    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
