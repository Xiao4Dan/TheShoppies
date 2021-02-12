import "../styles/Movies.scss";
import { auth, db } from "../firebaseconfig";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./AuthProvider";
import MovieList from "./MovieList";

function Movies(props) {
  const { toggle } = props;
  const [searchText, setSearchText] = useState("");
  const [movieResults, setMovieResults] = useState({});
  const [history, setHistory] = useState({});
  const { userRef, dbRef } = useContext(UserContext);

  const rateMovie = function (e) {
    const movieID = e.target.parentElement.id;
    const movieRating = e.target.value;
    /*
    const docRef = await dbRef.get();
    const docHistoryRef = await docRef.data();
    var newRatings = await docHistoryRef.ratings;
    newRatings[movieID] = movieRating;
    */
    console.log(movieID, movieRating);
    dbRef
      .update({ [`ratings.${movieID}`]: parseInt(movieRating) })
      .then(console.log("updated", movieRating))
      .then(updateHistory(movieID, movieRating))
      .catch((err) => console.error("updating history failed", err));
  };

  const updateHistory = function (id, rating) {
    const newHistory = history;
    newHistory[id] = parseInt(rating);
    setHistory(newHistory);
  };

  useEffect(() => {
    if (searchText !== "") {
      fetch("https://www.omdbapi.com?apikey=3fe96115&s=" + searchText)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovieResults(data);
        })
        .catch((err) => console.log(err));
    }
    console.log(history);
  }, [searchText]);

  useEffect(() => {
    //try to achieve componentDidMonut
    //but wait for dbRef is ready from null to firestore value
    if(dbRef){
      dbRef.get().then((data) => {
        setHistory(data.data().ratings);
      });
    }
  }, [dbRef]);

  return (
    <section className="MovieComponent">
      <button id="AuthToggle" onClick={toggle}>
        {userRef ? "Manage Account" : "Join Now"}
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
        {movieResults.Response === "True" ? (
          <MovieList
            movies={movieResults}
            rateMovie={rateMovie}
            history={history}
          />
        ) : (
          <h1>No Results</h1>
        )}
      </div>
    </section>
  );
}

export default Movies;
