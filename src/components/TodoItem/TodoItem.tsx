import React, { MouseEvent, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
import { user } from "../../Atom/userAtom";
import { useRecoilValue } from "recoil";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { todoInfo } from "../../page/Todo/Todo";

interface itemText {
  item: todoInfo;
}

const TodoItem = ({ item }: itemText) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");
  const isUser = useRecoilValue(user);

  const isFinish = async (id: string, state: boolean) => {
    const checkId = query(collection(db, `user/${isUser.uid}/todo`), where("id", "==", id));
    const findFinish = await getDocs(checkId);

    findFinish.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        state,
      });
    });
  };

  const isEdit = async (id: string, todo: string | MouseEvent<HTMLOrSVGElement>) => {
    const checkId = query(collection(db, `user/${isUser.uid}/todo`), where("id", "==", id));
    const findUpdate = await getDocs(checkId);

    findUpdate.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        todo,
      });
    });
    setEditMode(false);
  };

  const isDelete = async (id: string | MouseEvent<HTMLOrSVGElement>) => {
    const checkId = query(collection(db, `user/${isUser.uid}/todo`), where("id", "==", id));
    const findDelete = await getDocs(checkId);

    findDelete.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <li className="relative w-full h-16 flex flex-row items-center gap-4 px-2 text-lg border-b border-gray-400">
      <input
        type="checkbox"
        className="w-5 h-5"
        onClick={(e) => {
          const target = e.target as HTMLInputElement;
          isFinish(item.id, target.checked);
        }}
        defaultChecked={item.state}
      />
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
        <button type="button" onClick={() => isDelete(item.id)} disabled={item.state}>
          <RxCross2 className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
