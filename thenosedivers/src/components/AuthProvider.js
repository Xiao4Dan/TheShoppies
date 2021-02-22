import React, { Component, createContext } from "react";
import { auth, db } from "../firebaseconfig";

export const UserContext = createContext({ userRef: null, dbRef: null });

class UserProvider extends Component {
  state = {
    userRef: null,
    dbRef: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      try {
        if (userAuth) {
          db.collection("users")
            .doc(userAuth.uid)
            .get()
            .then((doc) => {
              if (!doc.exists) {
                db.collection("users")
                  .doc(userAuth.uid)
                  .set({
                    displayname: userAuth.displayName,
                    email: userAuth.email,
                    friends: [],
                    ratings: {},
                  });
              }
              this.setState({
                dbRef: db.collection("users").doc(userAuth.uid),
                userRef: userAuth,
              });
            });
        } else {
          this.setState({ dbRef: null, userRef: null });
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  render() {
    const userdata = this.state;
    return (
      <UserContext.Provider value={userdata}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
