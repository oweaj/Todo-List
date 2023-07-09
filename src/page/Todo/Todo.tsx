import Title from "../../components/Title/Title";

const Todo = () => {
  return (
    <>
      <div className="absolute top-7">
        <Title />
        <div className="flex flex-row justify-between gap-4">
          <input className="w-96 h-12 pl-2 border border-gray-500 rounded-lg" placeholder="할 일을 적어주세요." />
          <button className="w-24 border border-blue-400 text-blue-500 rounded-lg hover:text-white hover:bg-blue-400">
            추가하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
