import { Input, Button } from "../../components/Items/Items";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";

const Signin = () => {
  return (
    <>
      <Title />
      <form>
        <div className="formGap">
          <Input title="이메일" id={"email-input"} />
          <Input title="비밀번호" id={"password-input"} />
          <Button title="로그인" id={"signin-button"} />
          <div className="flex flex-row items-center justify-center">
            <Link to="/signup">회원가입</Link>
            <span className="mx-5">|</span>
            <Link to="/todo">둘러보기</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signin;
