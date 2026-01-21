import { Dispatch, SetStateAction } from "react";

export default function Empty({
  setShowAddColumnForm,
}: {
  setShowAddColumnForm: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex flex-col items-center
    justify-center min-h-screen gap-[2.5rem]"
    >
      <span
        className="text-[1.8rem] font-bold
        text-[#828fa3] text-center"
      >
        This board is empty. Create a new column to get started.
      </span>
      <button
        className="text-[1.5rem] font-bold
        text-white py-[1.5rem] px-[1.8rem]
        bg-[#635fc7] rounded-[2.4rem]
        cursor-pointer hover:bg-[#a8a4ff]
        transition-all duration-300"
        onClick={() => setShowAddColumnForm(true)}
      >
        + Add New Column
      </button>
    </div>
  );
}
