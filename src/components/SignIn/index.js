import React, { Component } from "react";
import "./styles.scss";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import AuthWrapper from "./../AuthWrapper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {

            await signInWithEmailAndPassword(auth, email, password);
            this.setState({
                ...initialState
            });
        } catch (err) {
            console.log(err);
        }

    }
    render() {

        const { email, password } = this.state;
        const configAuthWrapper = {
            headline: 'LogIn'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>

                <div className="formwrap">
                    <form onSubmit={this.handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />

                        <Button type="submit">
                            Login
                        </Button>


                        <div className="socialSignin">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Button>

                            </div>

                        </div>

                        <div class="Links">
                            <Link to='/recovery'>
                                Reset Password

                            </Link>
                        </div>
                    </form>

                </div>
            </AuthWrapper>

        );
    }

}
export default SignIn;