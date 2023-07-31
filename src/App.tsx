import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import { authService } from "./firebase";
import NotFound from "./page/NotFound/NotFound";
import Signin from "./page/Signin/Signin";
import Signup from "./page/Signup/Signup";
import { Todo } from "./page/Todo/Todo";
import { useSetRecoilState } from "recoil";
import { user } from "./Atom/userAtom";

function App() {
  const setUserInfo = useSetRecoilState(user);

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        localStorage.setItem("uid", user.uid);
        setUserInfo({
          email: user.email,
          uid: user.uid,
        });
      }
    });
  }, []);

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
