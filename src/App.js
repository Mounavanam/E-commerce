import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from './firebase/utils';
import { getDoc } from 'firebase/firestore';

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./default.scss";
import Recovery from "./pages/Recovery";

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      console.log("User Auth State Changed: ", userAuth);
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        const snapshot = await getDoc(userRef);
        console.log("Snapshot Data: ", snapshot.data());
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        });
      } else {
        this.setState({
          ...initialState
        });
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    console.log("Current User: ", currentUser);
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomepageLayout currentUser={currentUser}><Homepage /></HomepageLayout>} />
          <Route path="/registration" element={currentUser ? <Navigate to="/" /> : <MainLayout currentUser={currentUser}><Registration /></MainLayout>} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <MainLayout currentUser={currentUser}><Login /></MainLayout>} />
          <Route path="/recovery" element={<MainLayout currentUser={currentUser}><Recovery /></MainLayout>} />
        </Routes>
      </div>
    );
  }
}

export default App;
