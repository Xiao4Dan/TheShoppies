import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../AuthProvider";

function History() {
  const { userRef, dbRef } = useContext(UserContext);
  const [userHistory, setUserHistory] = useState([]);

  const fetchHistory = async function () {
    if (userRef && dbRef) {
      const doc = await dbRef.get();
      if (doc.exists) {
        console.log(doc.data().ratings);
        fetchMovieInfo(doc.data().ratings);
      }
    } else {
      console.error("user or user does not exists!");
    }
  };

  const fetchMovieInfo = function(ratings){
    console.log(ratings);
    for(const [key, value] of Object.entries(ratings)){
      fetch("https://www.omdbapi.com?apikey=3fe96115&i=" + key)
      .then((res) => res.json())
      .then((data) => {
        const temp = {
          Title: data.Title,
          Type: data.Type,
          Year: data.Year,
          Rating: value
        };
        //setUserHistory([...userHistory, temp]);
        //
        var table = document.getElementById("dashHistoryTable");
        var row = table.insertRow();
        var cellTitle = row.insertCell();
        var cellType = row.insertCell();
        var cellYear = row.insertCell();
        var cellRating = row.insertCell();
        cellTitle.innerHTML = temp.Title;
        cellType.innerHTML = temp.Type;
        cellYear.innerHTML = temp.Year;
        cellRating.innerHTML = temp.Rating;
      })
      .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    fetchHistory();
  });
  return (
    <div className="dashHistory">
      <div className="dashHistoryOverview">
        <h1>My History</h1>
        <div id="overview">
          <div>You have rated x movies</div>
          <div>x % of them are ? category</div>
          <div>IDK what to say next</div>
        </div>
      </div>
      <div className="dashHistoryList">
        <table id="dashHistoryTable">
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Year</th>
            <th onClick={fetchHistory}>Rating</th>
          </tr>
          {userHistory !== [] ? (
            userHistory.map((movie) => (
              <tr>
                <tb>{movie.Title}</tb>
                <tb>{movie.Type}</tb>
                <tb>{movie.Year}</tb>
                <tb>{movie.Rating}</tb>
              </tr>
            ))
          ) : (
            <tr>You dont have any ratings. Got rate a movie!</tr>
          )}
        </table>
      </div>
    </div>
  );
}

export default History;
