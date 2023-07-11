import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

interface itemText {
  item: string;
}

const TodoItem = ({ item }: itemText) => {
  const [icon, setIcon] = useState<"minus" | "check">("minus");

  const isToggle = () => {
    setIcon(icon === "minus" ? "check" : "minus");
  };

  const isDelete = () => {
    console.log("삭제");
  };

  return (
    <li className="relative w-full h-16 flex flex-row items-center gap-4 px-2 text-lg border-b border-gray-400">
      {icon === "minus" ? <AiOutlineMinusCircle className="w-6 h-6 cursor-pointer" onClick={isToggle} /> : <BsCheckCircleFill className="w-6 h-6 text-blue-500 cursor-pointer" onClick={isToggle} />}
      <span>{item}</span>
      <RxCross2 className="w-6 h-6 absolute right-3 cursor-pointer" onClick={isDelete} />
    </li>
  );
};

export default TodoItem;
