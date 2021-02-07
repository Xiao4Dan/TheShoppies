import "../styles/Movies.scss";
import { auth, db } from "../firebaseconfig";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./AuthProvider";
import MovieList from "./MovieList";

function Movies(props) {
  const {toggle} = props;
  const [searchText, setSearchText] = useState("");
  const [movieResults, setMovieResults] = useState({});
  const {userRef, dbRef} = useContext(UserContext);

  const rateMovie = async function (e) {
    const movieID = e.target.parentElement.id;
    const movieRating = e.target.value;
    var newRating = {};
    newRating[movieID] = movieRating;
    /*
    const docRef = await dbRef.get();
    const docHistoryRef = await docRef.data();
    let docHistory = docHistoryRef.ratings;
    let newHistory = [...docHistory];
    newHistory.push(newRating);
    console.log(newHistory);
    await dbRef.update({ratings:newHistory}).then(console.log('updated', newRating));*/
    const docRef = await dbRef.get();
    const docHistoryRef = await docRef.data();
    let docHistory = docHistoryRef.ratings;
    docHistory[movieID] = movieRating;
    await dbRef.update({ratings:docHistory}).then(console.log('updated',docHistory));
  };

  useEffect(() => {
    fetch("https://www.omdbapi.com?apikey=3fe96115&s=" + searchText)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovieResults(data);
      })
      .catch((err) => console.log(err));
  }, [searchText]);

  useEffect(() => {
  }, [movieResults]);

  return (
    <section className="MovieComponent">
      <button id="AuthToggle" onClick={toggle}>
        {(userRef) ? "Manage Account" : "Join Now"}
      </button>
      <div className="MovieSearchLanding">
        <h1 id="title">
          Do you have similar taste in movie?
          <br />
          Let's find out.
        </h1>
        <h4 id="prompt">The ultimate movie recommender among friends.</h4>
        <input
          id="searchText"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search a movie"
        ></input>
      </div>
      <div className="MovieResults">
        {movieResults.Response === "True" ? <MovieList movies={movieResults} rateMovie={rateMovie}/> : <h1>No Results</h1>}
      </div>
    </section>
  );
}

export default Movies;
