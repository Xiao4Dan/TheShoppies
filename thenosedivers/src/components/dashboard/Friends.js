import React, { useState, useContext} from "react";
import { db } from "../../firebaseconfig";

function Friends() {
  const [searchFriend, setSearchFriend] = useState("");

  const findUser = async function(){
      console.log(searchFriend);
      console.log('hiii');
      const dbRef = db.collection('users');
      const queryRef = await dbRef.where('email', '==', searchFriend).get();
      console.log(queryRef);
      queryRef.forEach(doc => {console.log(doc.id, doc.data())});
  };
  return (
    <div className="dashFriends">
      <input
        type="text"
        onChange={(e) => {
          setSearchFriend(e.target.value);
        }}
        placeholder="Enter User Email"
      />
      <button onClick={() => findUser()}>SEARCH</button>
      <h2>{searchFriend}</h2>
    </div>
  );
}

export default Friends;
