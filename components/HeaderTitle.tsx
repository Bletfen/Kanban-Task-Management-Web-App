"use client";
import { useState } from "react";
import BoardsDropDown from "./BoardsDropDown";
export default function HeaderTitle({ boards }: { boards: TBoards }) {
  const [showBoards, setShowBoards] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(boards[0].name || "Not Found");
  const handleDropDown = () => {
    if (!showBoards) {
      setShowBoards(true);
    } else {
      setShowBoards(false);
    }
  };
  return (
    <div className="flex items-center gap-[1.6rem]">
      <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
        <g fill="#635FC7" fillRule="evenodd">
          <rect width="6" height="25" rx="2" />
          <rect opacity=".75" x="9" width="6" height="25" rx="2" />
          <rect opacity=".5" x="18" width="6" height="25" rx="2" />
        </g>
      </svg>
      <div className="flex items-center gap-[0.8rem]">
        <h1>{title}</h1>
        <svg
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setShowBoards(true);
          }}
        >
          <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
        </svg>
      </div>
      {showBoards && (
        <BoardsDropDown
          boards={boards}
          setShowBoards={setShowBoards}
          setTitle={setTitle}
        />
      )}
    </div>
  );
}
