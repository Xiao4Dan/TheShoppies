
import React, {useContext, useEffect} from 'react';
import { UserContext } from '../AuthProvider';


function History(){
  const { userRef, dbRef } = useContext(UserContext);

  const fetchHistory = async function () {
    if (userRef && dbRef) {
      const doc = await dbRef.get();
      if (doc.exists) {
        console.log(doc.data().ratings);
      }
    } else {
      console.error("user or user does not exists!");
    }
  };

  useEffect(() => {
    fetchHistory();
  });
    return (
        <div className="dashHistory">
        </div>
      );
}

export default History;