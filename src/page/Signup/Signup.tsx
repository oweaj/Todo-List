import { Input, Button } from "../../components/Items/Items";
import Title from "../../components/Title/Title";

const Signup = () => {
  return (
    <>
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email-input"} />
          <Input title="비밀번호" id={"password-input"} />
          <Input title="닉네임" id={"nickName-input"} />
          <Button title="회원가입" id={"signup-button"} />
        </div>
      </form>
    </>
  );
};

export default Signup;
