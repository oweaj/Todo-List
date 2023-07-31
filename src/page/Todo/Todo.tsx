import React, { useState, KeyboardEvent, useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { authService, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../Atom/userAtom";

export interface todoInfo {
  todo: string;
  state: boolean;
  id: string;
  date: number;
}

export const Todo = () => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [todoList, setTodoList] = useState<todoInfo[]>([]);
  const isUser = useRecoilValue(user);
  const navigate = useNavigate();
  const date = new Date();
  const weekday = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/");
    }
  }, []);

  const addTodo = async () => {
    if (todoValue === "") {
      alert("빈 문장 입니다. 다시 입력해주세요.");
      return;
    }

    await addDoc(collection(db, `user/${isUser.uid}/todo`), {
      todo: todoValue,
      state: false,
      date: date.getTime(),
    });
    setTodoValue("");
  };

  const addEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      addTodo();
    }
  };

  const isFinish = async (item: todoInfo) => {
    await updateDoc(doc(db, `user/${isUser.uid}/todo`, item.id), {
      state: !item.state,
    });
  };

  const isDelete = async (id: string) => {
    await deleteDoc(doc(db, `user/${isUser.uid}/todo`, id));
  };

  useEffect(() => {
    const q = query(collection(db, `user/${isUser.uid}/todo`), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr: todoInfo[] = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ id: doc.id, ...doc.data() } as todoInfo);
      });
      setTodoList(todoArr);
    });
    return () => unsubscribe();
  }, [isUser.uid]);

  const logout = () => {
    signOut(authService);
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("uid");
    navigate("/");
  };

  const check = todoList.filter((todo) => !todo.state).length;

  const checkMsg = () => {
    if (check <= 0) {
      if (todoList.length > 0) return "오늘 할 일을 마치셨어요!!";
      else return "📚 할 일을 추가해보세요.";
    } else return `${check}개의 할 일이 남았습니다.`;
  };

  return (
    <div className="h-full flex flex-col items-center gap-3">
      <button className="absolute top-5 right-5 w-[70px] h-8 border border-gray-500 rounded-lg hover:text-white hover:bg-red-400 hover:border-none" onClick={logout}>
        로그아웃
      </button>
      <div className="text-center text-gray-700 font-medium">
        <p className="text-3xl mb-4">{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekday[date.getDay()]}`}</p>
        <span className="text-2xl text-green-500">{checkMsg()}</span>
      </div>
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
      <ul className="w-[30rem] h-[26rem] overflow-y-auto">
        {todoList && todoList.length ? (
          <div className="relative flex flex-row items-center gap-3 text-sm px-1">
            <span>상태</span>
            <span>할 일 제목</span>
            <div className="absolute right-3">
              <span className="mr-3">수정</span>
              <span>삭제</span>
            </div>
          </div>
        ) : null}
        {todoList.map((item: todoInfo, index) => (
          <TodoItem key={index} item={item} isFinish={isFinish} isDelete={isDelete} />
        ))}
      </ul>
    </div>
  );
};
