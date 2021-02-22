import '../styles/AuthComponent.scss';
import { auth, db } from '../firebaseconfig';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './AuthProvider';
import UserDashboard from './UserDashboard';
function AuthComponent(props) {
    const { toggle } = props;
    const [hasAccount, setHasAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dashboardRoute, setDashboardRoute] = useState('profile');
    const { userRef, dbRef } = useContext(UserContext);

    const toggleAuth = function () {
        toggle();
    }

    const signIn = () => {
        console.log('signin');
        auth.signInWithEmailAndPassword(username, password).catch(
            (error) => console.error(error)
        );
    };

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

    return (
        <section className="AuthComponent" id="AuthComponent">
            {(userRef)
                ? (<div className="UserDashboard">
                    <div className="dashboardNav">
                        <span id="closeAuth" onClick={() => toggleAuth()}></span>
                        <button onClick={() => setDashboardRoute('profile')}>PROFILE</button>
                        <button onClick={() => setDashboardRoute('friends')}>FRIENDS</button>
                        <button onClick={() => setDashboardRoute('history')}>HISTORY</button>
                        <button onClick={() => signOut()}>SIGN OUT</button>
                    </div>
                    <UserDashboard msg={dashboardRoute}></UserDashboard>
                </div>)
                : (<div className="AuthForm">
                    <span id="closeAuth" onClick={() => toggleAuth()}></span>
                    {hasAccount ? <h1>Welcome<br />Back</h1> : <h1>Create<br />Account</h1>}
                    <input type="text" value={username} placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    {
                        (hasAccount)
                            ? <><button onClick={() => signIn()}>Sign In</button><p>Don't have Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p></>
                            : <><button onClick={() => signUp()}>Sign Up</button><p>Already a Member? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p></>
                    }
                </div>)}
        </section>
    );
}

export default AuthComponent;
