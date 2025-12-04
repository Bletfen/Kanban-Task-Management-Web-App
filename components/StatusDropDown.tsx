"use client";
import { Dispatch, SetStateAction } from "react";
export default function StatusDropDown({
  setShowMenu,
  changeStatus,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  changeStatus: (newStatus: string) => Promise<void>;
}) {
  return (
    <div
      className="absolute top-20 left-0
        p-[1.6rem] bg-white rounded-[0.8rem]
        shadow-[0_1rem_2rem_0_rgba(54,78,126,0.25)]
        w-full
        flex flex-col gap-[0.8rem]
        text-[1.3rem] font-[500] text-[#828fa3]"
    >
      <p onClick={() => changeStatus("Todo")}>Todo</p>
      <p onClick={() => changeStatus("Doing")}>Doing</p>
      <p onClick={() => changeStatus("Done")}>Done</p>
    </div>
  );
}
