import React, { ChangeEvent, MouseEvent } from "react";
import { useRecoilValue } from "recoil";
import { checkPW } from "../../Atom/userAtom";

interface inputInfo {
  title: string;
  id: string;
  value: string;
  state: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface btnInfo {
  title: string;
  id: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  active: boolean;
}

export const Input = ({ title, id, value, state, onChange }: inputInfo) => {
  const passwordCheck = useRecoilValue(checkPW);

  return (
    <div className="w-96">
      <label htmlFor={id}>{title}</label>
      <div className="relative">
        <input
          required
          type={id === "email" ? "email" : "password"}
          id={id}
          className="w-full h-12 pl-2 border border-gray-400 rounded-lg"
          placeholder={id === "email" ? "email@email.com" : "영문, 숫자, 특수문자 포함 8~15자"}
          onChange={onChange}
          value={value}
        />
        <span className="absolute left-0 top-12 text-sm text-red-500">
          {id === "email" && value && !state
            ? "이메일 형식이 올바르지 않습니다."
            : id === "password" && value && !state
            ? "비밀번호 형식이 올바르지 않습니다."
            : id === "pwCheck" && value && !passwordCheck
            ? "비밀번호가 일치하지 않습니다."
            : ""}
        </span>
      </div>
    </div>
  );
};

export const Button = ({ title, id, onClick, active }: btnInfo) => {
  return (
    <button type="submit" id={id} className={`w-96 h-12 mt-1 rounded-lg text-lg text-white ${active ? "bg-blue-400" : "bg-gray-300"}`} onClick={onClick} disabled={!active}>
      {title}
    </button>
  );
};
