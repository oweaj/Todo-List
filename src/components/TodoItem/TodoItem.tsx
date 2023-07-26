import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
import { user } from "../../Atom/userAtom";
import { useRecoilValue } from "recoil";
import { todoInfo } from "../../page/Todo/Todo";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface itemText {
  item: todoInfo;
  isFinish: (item: todoInfo) => Promise<void>;
  isDelete: (id: string) => Promise<void>;
}

const TodoItem = ({ item, isFinish, isDelete }: itemText) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");
  const isUser = useRecoilValue(user);

  const isEdit = async (id: string, newTodo: string) => {
    await updateDoc(doc(db, `user/${isUser.uid}/todo`, id), {
      todo: newTodo,
    });
    setEditMode(false);
  };

  return (
    <li className="relative w-full h-16 flex flex-row items-center gap-4 px-2 text-lg border-b border-gray-400">
      <input type="checkbox" checked={item.state} className="w-5 h-5" onChange={() => isFinish(item)} />
      <span className={item.state ? "text-gray-400 line-through" : ""}>{editMode ? "" : item.todo}</span>
      {editMode && <input type="text" className="w-2/3 h-9 p-2 border border-gray-400 rounded-lg" onChange={(e) => setEditValue(e.target.value)} />}
      <div className="absolute right-3 flex flex-row items-center gap-4">
        {editMode ? (
          <button type="button" onClick={() => isEdit(item.id, editValue)}>
            <BsCheckLg className="w-6 h-6" />
          </button>
        ) : (
          <button type="button" onClick={() => setEditMode(true)} disabled={item.state}>
            <BsPencilFill className="w-5 h-5" />
          </button>
        )}
        <button type="button" onClick={() => isDelete(item.id)}>
          <RxCross2 className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
