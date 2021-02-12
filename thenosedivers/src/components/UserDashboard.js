import '../styles/UserDashboard.scss';
import React from 'react';
import Profile from './dashboard/Profile';
import Friends from './dashboard/Friends';
import History from './dashboard/History';

function UserDashboard(props){
    const {msg} = props;
    return (
        <div className="dashboardWrapper">
          {msg === "profile" && <Profile></Profile>}
          {msg === "friends" && <Friends></Friends>}
          {msg === "history" && <History></History>}
        </div>
      );
}

export default UserDashboard;