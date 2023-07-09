import React, { ChangeEvent } from "react";

interface itemInfo {
  title: string;
  id: string;
}

export const Input = ({ title, id }: itemInfo) => {
  const inputHandle = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="w-96">
      <label htmlFor={id}>{title}</label>
      <input type="text" id={id} data-testid={id} className="w-full h-12 pl-2 border border-gray-400 rounded-lg" />
      <span className="text-red-500">
        {id === "email-input"
          ? "이메일 형식이 올바르지 않습니다."
          : id === "password-input"
          ? "비밀번호 형식이 올바르지 않습니다."
          : "닉네임 형식이 올바르지 않습니다."}
      </span>
    </div>
  );
};

export const Button = ({ title, id }: itemInfo) => {
  return (
    <button id={id} className="w-96 h-12 mt-1 rounded-lg text-lg text-white bg-blue-400">
      {title}
    </button>
  );
};
