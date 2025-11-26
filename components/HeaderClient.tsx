"use client";
import { useState } from "react";
import HeaderTitle from "./HeaderTitle";
import ThreeDotMenu from "./ThreeDotMenu";

export default function HeaderClient({ boards }: { boards: TBoards }) {
  const [showBoards, setShowBoards] = useState<boolean>(false);
  return (
    <div className="relative">
      {showBoards && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowBoards(false)}
        ></div>
      )}
      <div
        className="flex items-center justify-between
     p-[1.6rem] relative z-50 bg-white"
      >
        <HeaderTitle
          boards={boards}
          showBoards={showBoards}
          setShowBoards={setShowBoards}
        />
        <div className="flex items-center gap-[1.6rem]">
          <button
            className="py-[1rem] px-[1.8rem]
          bg-[#635fc7] rounded-[2.4rem] cursor-pointer"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          </button>
          <ThreeDotMenu type={"board"} />
        </div>
      </div>
    </div>
  );
}
