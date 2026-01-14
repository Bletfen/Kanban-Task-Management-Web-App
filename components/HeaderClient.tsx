"use client";
import { useEffect, useState } from "react";
import HeaderTitle from "./HeaderTitle";
import ThreeDotMenu from "./ThreeDotMenu";
import { useParams } from "next/navigation";
import Form from "./Form";

export default function HeaderClient({ boards }: { boards: TBoards }) {
  const [showBoards, setShowBoards] = useState<boolean>(false);
  const params = useParams();
  const paramsBoardName = params.board;
  const decodedBoardName = decodeURIComponent(
    (Array.isArray(paramsBoardName) ? paramsBoardName[0] : paramsBoardName) ||
      ""
  );
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
  const [statusNames, setStatusNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchStatusNames = async () => {
      try {
        const res = await fetch(`/api/boards/${decodedBoardName}`);
        const data = await res.json();
        const names = data.columns.map((col: TColumns) => col.name);
        setStatusNames(names);
      } catch (err) {
        console.error("Error fetching status names:", err);
      }
    };
    fetchStatusNames();
  }, [decodedBoardName]);
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
          paramsBoardName={decodedBoardName}
        />
        <div className="flex items-center gap-[1.6rem]">
          <button
            className="py-[1rem] px-[1.8rem]
          bg-[#635fc7] rounded-[2.4rem] cursor-pointer"
            onClick={() => setShowAddTaskForm(true)}
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          </button>
          <ThreeDotMenu
            type={"board"}
            boardName={decodedBoardName}
            boards={boards}
          />
        </div>
      </div>
      {showAddTaskForm && (
        <Form
          type="addTask"
          setShowEdit={setShowAddTaskForm}
          boardName={decodedBoardName}
          statusNames={statusNames}
        />
      )}
    </div>
  );
}
