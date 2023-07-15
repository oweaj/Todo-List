import React, { useState, useEffect, MouseEvent } from "react";
import { Input, Button } from "../../components/Items/Items";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Header/Header";
import useInput from "../../hooks/useInput";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "../../firebase";

const Signin = () => {
  const [active, setActive] = useState<boolean>(false);
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const login = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email.data, password.data);
      alert("로그인 되었습니다.");
      navigate("/todo");
    } catch (error) {
      alert("아이디 또는 비밀번호를 다시 입력해주세요.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
      navigate("/todo");
    } catch (error) {
      alert("로그인에 실패했습니다.");
    }
  };

  useEffect(() => {
    email.state && password.state ? setActive(true) : setActive(false);
  }, [email.state, password.state]);

  return (
    <div className="contentsStyle">
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email"} value={email.data} state={email.state} onChange={email.onChange} />
          <Input title="비밀번호" id={"password"} value={password.data} state={password.state} onChange={password.onChange} />
          <Button title="로그인" id={"signin-button"} onClick={login} active={active} />
          <div className="flex flex-row items-center justify-center text-center">
            <button type="button" className="w-28" onClick={handleGoogleLogin}>
              Google 로그인
            </button>
            <span className="mx-6">|</span>
            <Link to="/signup" className="w-28">
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
