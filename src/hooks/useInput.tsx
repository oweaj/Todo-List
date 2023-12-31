import React, { useState, ChangeEvent } from "react";

const useInput = () => {
  const [data, setData] = useState<string>("");
  const [state, setState] = useState<boolean>(false);
  const emailCheck = /([\w-.]+)@(([\w-]+\.)+)([a-zA-Z]{2,4})(\]?)$/;
  const passWordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData(value);

    if (id === "email") {
      setState(emailCheck.test(value) ? true : false);
    } else if (id === "password") {
      setState(passWordCheck.test(value) ? true : false);
    } else {
      setState(false);
    }
  };

  return { data, state, onChange };
};

export default useInput;
