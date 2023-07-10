import React, { ChangeEvent } from "react";

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
  active: boolean;
}

export const Input = ({ title, id, value, state, onChange }: inputInfo) => {
  return (
    <div className="w-96">
      <label htmlFor={id}>{title}</label>
      <div className="relative">
        <input
          required
          type={id === "nickName" ? "text" : id}
          id={id}
          data-testid={id}
          className="w-full h-12 pl-2 border border-gray-400 rounded-lg"
          placeholder={id === "email" ? "email@email.com" : id === "password" ? "영문, 숫자, 특수문자 포함 8~15자" : "한글, 영문, 숫자 가능 3~8자"}
          onChange={onChange}
          value={value}
        />
        <span className="absolute left-0 top-12 text-sm text-red-500">
          {id === "email" && value && !state
            ? "이메일 형식이 올바르지 않습니다."
            : id === "password" && value && !state
            ? "비밀번호 형식이 올바르지 않습니다."
            : id === "nickName" && value && !state
            ? "닉네임 형식이 올바르지 않습니다."
            : ""}
        </span>
      </div>
    </div>
  );
};

export const Button = ({ title, id, active }: btnInfo) => {
  return (
    <button
      type="submit"
      id={id}
      className={`w-96 h-12 mt-1 rounded-lg text-lg text-white ${title === "로그인" || active ? "bg-blue-400" : "bg-gray-300"}`}
      disabled={title === "회원가입" ? !active : active}
    >
      {title}
    </button>
  );
};
