import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

const facebookProvider = new FacebookAuthProvider();

const auth = getAuth();

function App() {
  const [userData, setUserData] = useState({});
  const { displayName, photoURL } = userData;

  const handlerFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        const user = res.user;
        setUserData(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlerFacebookLogOut = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        setUserData("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="App mt-5">
      {displayName ? (
        <button
          onClick={handlerFacebookLogOut}
          type="submit"
          className="btn btn-dark"
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={handlerFacebookSignIn}
          type="submit"
          className="btn btn-dark"
        >
          Facebook Sign In
        </button>
      )}
      <br />
      <br />
      <br />
      <div className="mt-5">
        <img style={{ width: "100px" }} src={photoURL} alt="" />
        <br />
        <br />
        <h4>
          {displayName ? "Name:" : ""} {displayName}
        </h4>
      </div>
    </div>
  );
}

export default App;
