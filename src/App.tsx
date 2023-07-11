import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./page/NotFound/NotFound";
import Signin from "./page/Signin/Signin";
import Signup from "./page/Signup/Signup";
import Todo from "./page/Todo/Todo";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  console.log(app);

  return (
    <div className="w-screen h-screen bg-gray-200">
      <div className="w-[45rem] h-[40rem] rounded-lg p-6 shadow-2xl bg-white center">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
