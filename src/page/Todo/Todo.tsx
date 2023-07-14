import React, { useState, KeyboardEvent, useEffect } from "react";
import Title from "../../components/Header/Header";
import TodoItem from "../../components/TodoItem/TodoItem";
import { addDoc, collection } from "firebase/firestore";
import { authService, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../Atom/userAtom";
import { useCollectionData } from "react-firebase-hooks/firestore";

export interface todoInfo {
  todo: string;
  state: boolean;
  id: string;
}

export const Todo = () => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [todoList, setTodoList] = useState<any>([]);
  const isUser = useRecoilValue(user);
  const navigate = useNavigate();
  const [todo] = useCollectionData(collection(db, `user/${isUser.uid}/todo`));

  const addTodo = async () => {
    await addDoc(collection(db, `user/${isUser.uid}/todo`), {
      todo: todoValue,
      state: false,
      id: new Date().getTime(),
    });
    setTodoValue("");
  };

  useEffect(() => {
    setTodoList(todo);
  }, [todo]);

  const logout = () => {
    signOut(authService);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const addEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      addTodo();
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-3">
      <button className="absolute top-5 right-5 w-[70px] h-8 border border-gray-500 rounded-lg hover:text-white hover:bg-red-400 hover:border-none" onClick={logout}>
        로그아웃
      </button>
      <Title />
      <div className="w-[30rem] flex flex-row justify-between gap-3">
        <input
          className="w-4/5 h-12 pl-2 border border-gray-500 rounded-lg"
          placeholder={`${isUser.email}님 할 일을 적어주세요.`}
          onChange={(e) => setTodoValue(e.target.value)}
          onKeyDown={addEnter}
          value={todoValue}
        />
        <button className="flex-grow border border-blue-500 text-blue-500 rounded-lg hover:text-white hover:bg-blue-500" onClick={addTodo}>
          추가하기
        </button>
      </div>
      <ul className="w-[30rem] h-full overflow-y-auto">
        {todoList && todoList.length ? (
          <div className="relative flex flex-row items-center gap-5 text-sm px-2">
            <span>상태</span>
            <span>할 일 제목</span>
            <div className="absolute right-3">
              <span className="mr-3">수정</span>
              <span>삭제</span>
            </div>
          </div>
        ) : null}

        {todoList && todoList.map((item: todoInfo, index: number) => <TodoItem key={index} item={item} />)}
      </ul>
    </div>
  );
};
