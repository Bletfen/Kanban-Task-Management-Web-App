"use client";
import { useEffect, useState } from "react";
import BoardsDropDown from "./BoardsDropDown";
import Form from "./Form";

export default function SideBar({ boards }: { boards: TBoards }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState<boolean>(false);
  return (
    <>
      <aside
        className={`hidden md:block gap-[2rem] shrink-0
            min-h-screen bg-white border-r border-r-[#e4ebfa]
            transition-all duration-300 ease-in-out
        ${isOpen ? "w-[260px]" : "w-[0]"}`}
      >
        {isOpen && (
          <div className="pb-[3.3rem]">
            <div>
              <BoardsDropDown
                boards={boards}
                type={"tablet"}
                onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
              />
              <div
                className="py-[1.6rem] px-[2.4rem]
              text-[#828fa3] text-[1.5rem] font-bold
              flex items-center gap-[1rem]
              mt-[1.6rem] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Hide Sidebar</span>
              </div>
            </div>
          </div>
        )}
      </aside>
      {!isOpen && (
        <div
          className="py-[1.9rem] pl-[1.8rem] pr-[2.2rem]
          bg-[#635fc7] h-[4.8rem] rounded-r-full absolute
          top-[100%] left-0 curosor-pointer
          hidden md:flex cursor-pointer z-50"
          onClick={() => setIsOpen(true)}
        >
          <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
              fill="#FFF"
            />
          </svg>
        </div>
      )}
      {isCreateBoardOpen && (
        <Form type={"addBoard"} setShowEdit={setIsCreateBoardOpen} />
      )}
    </>
  );
}
