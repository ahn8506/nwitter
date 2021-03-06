import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      /* force update userObj state */
      if (user) {
        user.reloadUserObj = async () => {
          setUserObj(null);
          setUserObj(() => authService.currentUser);
        }
        setUserObj(user);
      } else {
        setUserObj(null);
      }

      setInit(true);
    });
    /*  if (user) {
        //  setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        // } else {
        //   setIsLoggedIn(false);
      }*/
    // setInit(true);
    // });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
      /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>

  );
}

export default App;
