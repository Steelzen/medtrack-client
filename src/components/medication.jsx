// TODO: Medcal history
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Medication = () => {
  const [userID, setUserID] = useState("");
  let auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        auth = await getAuth();
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUserID(user.uid);
            } else {
              setUserID("");
            }
            resolve(); // Resolve the Promise once the auth state has been handled
          });
          unsubscribe();
        });

        /** TODO: data fetching for medical histories  */
        // const userID = auth.currentUser.uid;
        // setUserID(userID);

        // const db = getFirestore();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Medication</h1>
      <p>User ID: {userID}</p>
    </div>
  );
};

export default Medication;
