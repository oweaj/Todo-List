import React, { useState, KeyboardEvent } from "react";
import Title from "../../components/Title/Title";
import TodoItem from "../../components/TodoItem/TodoItem";

const Todo = () => {
  const [todoValue, setTodoValue] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = () => {
    setTodoList([...todoList, todoValue]);
    setTodoValue("");
  };

  const addEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      addTodo();
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-3">
      <Title />
      <div className="w-[30rem] flex flex-row justify-between gap-3">
        <input className="w-4/5 h-12 pl-2 border border-gray-500 rounded-lg" placeholder="할 일을 적어주세요." onChange={(e) => setTodoValue(e.target.value)} onKeyDown={addEnter} value={todoValue} />
        <button className="flex-grow border border-blue-500 text-blue-500 rounded-lg hover:text-white hover:bg-blue-500" onClick={addTodo}>
          추가하기
        </button>
      </div>
      <ul className="w-[30rem] h-full overflow-y-auto">
        {todoList.length ? (
          <div className="relative flex flex-row items-center gap-5 text-sm px-2">
            <span>상태</span>
            <span>할 일 제목</span>
            <span className="absolute right-3">삭제</span>
          </div>
        ) : null}
        {todoList.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
