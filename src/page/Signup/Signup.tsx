import { useEffect, useState } from "react";
import { Input, Button } from "../../components/Items/Items";
import Title from "../../components/Title/Title";
import useInput from "../../hooks/useInput";

const Signup = () => {
  const [active, setActive] = useState<boolean>(false);
  const email = useInput();
  const password = useInput();
  const nickName = useInput();

  useEffect(() => {
    email.state && password.state && nickName.state ? setActive(true) : setActive(false);
  }, [email.state, password.state, nickName.state]);

  return (
    <>
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email"} value={email.data} state={email.state} onChange={email.onChange} />
          <Input title="비밀번호" id={"password"} value={password.data} state={password.state} onChange={password.onChange} />
          <Input title="닉네임" id={"nickName"} value={nickName.data} state={nickName.state} onChange={nickName.onChange} />
          <Button title="회원가입" id={"signup-button"} active={active} />
        </div>
      </form>
    </>
  );
};

export default Signup;
