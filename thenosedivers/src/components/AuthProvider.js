import React, { Component, createContext } from "react";
import { auth, db } from "../firebaseconfig";

export const UserContext = createContext({ userRef:null, dbRef:null});

class UserProvider extends Component {
    state = {
        userRef: null,
        dbRef: null
    };

    componentDidMount = async() => {
        auth.onAuthStateChanged(async(userAuth) => {
            console.log(userAuth);
            if(userAuth){
                const userDoc =  await db.collection('users').doc(userAuth.uid);//userDoc.get().data();
                if(!userDoc.get().exists){
                    const data = {
                        displayname: '',
                        email:userAuth.email,
                        friends: [''],
                        ratings:[{}]
                    };
                    const temp = await db.collection('users').doc(userAuth.uid).set(data);
                    console.log(temp);
                }
                this.setState({dbRef: userDoc});
                this.setState({userRef:userAuth});
            }else{
                this.setState({dbRef: null});
                this.setState({userRef:null});
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
