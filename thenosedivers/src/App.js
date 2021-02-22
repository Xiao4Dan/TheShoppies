import "./styles/App.scss";
import db from "./firebaseconfig";
import React, {useEffect, useReducer} from "react";
import AuthProvider from "./components/AuthProvider";
import AuthComponent from "./components/AuthComponent";
import Movies from "./components/Movies";

function App() {
  const closeAuthComponent = function () {
    document.getElementById("AuthComponent").style.height = "0";
  };
  const openAuthComponent = function () {
    document.getElementById("AuthComponent").style.height = "100%";
  };

  const findUserByEmail = async function(userEmail){
    const doc = await db.collection("users").where("email", "==", userEmail).get();
    doc.forEach((obj) => {
      return (obj.id, obj.data());
    });
  }

  const findUserByDisplayName = async function(userName){
    const doc = await db.collection("users").where("displayname", "array-contains", userName).get();
    doc.forEach((obj) => {
      return (obj.id, obj.data());
    });
  }

  const fetcher = {findUserByEmail, findUserByDisplayName};
  return (
    <AuthProvider>
      <AuthComponent toggle = {closeAuthComponent}></AuthComponent>
      <Movies toggle={openAuthComponent}></Movies>
    </AuthProvider>
  );
}

export default App;
