import React, { useState, useEffect, MouseEvent } from "react";
import { Input, Button } from "../../components/Items/Items";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Header/Header";
import useInput from "../../hooks/useInput";
import { signInWithEmailAndPassword } from "firebase/auth";
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
          <Link to="/signup" className="flex items-center justify-center w-96 h-12 rounded-lg text-lg text-white bg-blue-400">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
