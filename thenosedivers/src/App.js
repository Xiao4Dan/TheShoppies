import "./styles/App.scss";
import firebase from "firebase/app";
import db from "./firebaseconfig";
import React, { useState, useContext } from "react";
import AuthComponent from "./components/AuthComponent";
import UserDashboard from "./components/UserDashboard";
import AuthProvider from "./components/AuthProvider";
import { UserContext } from "./components/AuthProvider";
import Movies from "./components/Movies";

function App() {
  const { userRef, dbRef } = useContext(UserContext);

  const fetch = function (prop) {
    console.log(prop.uid);
    console.log(userRef, dbRef);
  };
  const closeAuthComponent = function () {
    document.getElementById("AuthComponent").style.height = "0";
  };
  const openAuthComponent = function () {
    document.getElementById("AuthComponent").style.height = "100%";
  };
  return (
    <AuthProvider>
      <AuthComponent toggle={closeAuthComponent}></AuthComponent>
      <Movies toggle={openAuthComponent}></Movies>
    </AuthProvider>
  );
}

export default App;
