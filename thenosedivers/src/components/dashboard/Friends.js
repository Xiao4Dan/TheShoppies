import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../AuthProvider";
import { auth, db } from "../../firebaseconfig";

function Friends() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { userRef, dbRef } = useContext(UserContext);

  const findUser = async function () {
    const docRef = await db
      .collection("users")
      .where("email", "==", searchText)
      .get();
    const results = [];
    docRef.forEach((doc) => {
      results.push({
        id: doc.id,
        history: doc.data().ratings,
        name: doc.data().displayname,
        email: doc.data().email
      });
    });
    console.log(results);
    setSearchResults(results);
  };

  const addFriend = function (userID){
    dbRef
      .update({ [`friends.${userID}`]: false })
      .then(console.log("added", userID))
      .then(console.log("send friend request till true"))
      .catch((err) => console.error("updating history failed", err));
  }


  return (
    <div className="dashFriends">
      <div className="dashSearchFriend">
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Enter User Email"
        />
        <ul className="dashSearchResults">
          {searchResults.length !== 0 &&
            searchResults.map((user) => (
              <li key={user.id}>
                <b>{user.name}</b>
                <br />
                <i>{user.email}</i>
                <span onClick={() => addFriend(user.id)}>ADD</span>
              </li>
            ))}
        </ul>
        <button onClick={() => findUser()}>Search</button>
      </div>
    </div>
  );
}

export default Friends;
