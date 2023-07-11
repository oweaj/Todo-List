import { Input, Button } from "../../components/Items/Items";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import useInput from "../../hooks/useInput";
import { useState } from "react";

const Signin = () => {
  const [active, setActive] = useState<boolean>(false);
  const email = useInput();
  const password = useInput();

  return (
    <div className="contentsStyle">
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email"} value={email.data} state={email.state} onChange={email.onChange} />
          <Input title="비밀번호" id={"password"} value={password.data} state={password.state} onChange={password.onChange} />
          <Button title="로그인" id={"signin-button"} active={active} />
          <div className="flex flex-row items-center justify-center">
            <Link to="/signup">회원가입</Link>
            <span className="mx-5">|</span>
            <Link to="/todo">둘러보기</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
