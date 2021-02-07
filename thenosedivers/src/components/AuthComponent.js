import '../styles/AuthComponent.scss';
import { auth, db } from '../firebaseconfig';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './AuthProvider';
function AuthComponent(props) {
    const { toggle } = props;
    const [hasAccount, setHasAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { userRef, dbRef } = useContext(UserContext);

    const checkAuth = () => {
        console.log('signin');
        auth.signInWithEmailAndPassword(username, password).catch(
            (error) => console.log(error)
        );
        toggle();
    };

    const toggleAuth = function () {
        toggle();
    }

    const signUp = () => {
        console.log('signup');
        auth.createUserWithEmailAndPassword(username, password).catch(
            (error) => console.log(error)
        ).then(
            u => console.log(u)
        );
        toggle();
    };

    const signOut = function () {
        auth.signOut();
    }

    const checkData = function () {
        if (userRef && dbRef) {
            console.log(userRef);
        }
    }

    return (
        <section className="AuthComponent" id="AuthComponent">
            {(userRef)
                ? (<div className="UserDashboard">
                    <span id="closeAuth" onClick={toggleAuth}></span>
                    <button onClick={signOut}>OUT</button>
                    <button onClick={checkData}>CEHCK</button>
                </div>)
                : (<div className="AuthForm">
                    <span id="closeAuth" onClick={toggleAuth}></span>
                    <h1>{(hasAccount) ? <>Welcome<br />Back</> : <>Create<br />Account</>}</h1>
                    <input type="text" value={username} placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={(hasAccount) ? checkAuth.bind(this) : signUp.bind(this)}>{(hasAccount) ? "Sign In" : "Sign Up"}</button>
                    {
                        (hasAccount)
                            ? <p>Don't have Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                            : <p>Already a Member? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                    }
                </div>)}
        </section>
    );
}

export default AuthComponent;
