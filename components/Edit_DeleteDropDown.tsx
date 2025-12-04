"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function Edit_DeleteDropDown({
  type,
  setShowEdit,
  setShowDelete,
  setShowEditDelete,
}: {
  type: string;
  setShowEditDelete: Dispatch<SetStateAction<boolean>>;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="absolute bg-white p-[1.6rem]
      flex flex-col gap-[1.6rem]
      w-[19.2rem] right-1/2 translate-x-1/2
      top-12 rounded-[0.8rem]
      shadow-[0_1rem_2rem_0_rgba(54,78,126,0.25)]
      text-[1.3rem] font-[500] leading-[1.77]"
    >
      <p
        onClick={() => {
          setShowEditDelete(false);
          setShowEdit(true);
        }}
        className="text-[#828fa3]"
      >
        Edit {type === "board" ? "board" : "task"}
      </p>
      <p
        onClick={() => {
          setShowEditDelete(false);
          setShowDelete(true);
        }}
        className="text-[#ea5555]"
      >
        Delete {type === "board" ? "board" : "task"}
      </p>
    </div>
  );
}
