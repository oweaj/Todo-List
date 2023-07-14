import React, { useEffect, useState, MouseEvent } from "react";
import { Input, Button } from "../../components/Items/Items";
import Title from "../../components/Header/Header";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../firebase";
import { useSetRecoilState } from "recoil";
import { checkPW } from "../../Atom/userAtom";

const Signup = () => {
  const [active, setActive] = useState<boolean>(false);
  const email = useInput();
  const password = useInput();
  const pwCheck = useInput();
  const passwordCheck = useSetRecoilState(checkPW);
  const navigate = useNavigate();

  const register = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(authService, email.data, password.data);
      alert("회원가입 되었습니다.");
      navigate("/");
    } catch (error) {
      alert("아이디를 다시 입력해주세요.");
    }
  };

  useEffect(() => {
    passwordCheck(password.data === pwCheck.data);
    email.state && password.state && password.data === pwCheck.data ? setActive(true) : setActive(false);
  }, [email.state, password.state, pwCheck.data]);

  return (
    <div className="contentsStyle">
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email"} value={email.data} state={email.state} onChange={email.onChange} />
          <Input title="비밀번호" id={"password"} value={password.data} state={password.state} onChange={password.onChange} />
          <Input title="비밀번호 재확인" id={"pwCheck"} value={pwCheck.data} state={pwCheck.state} onChange={pwCheck.onChange} />
          <Button title="회원가입" id={"signup-button"} onClick={register} active={active} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
