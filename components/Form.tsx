"use client";

import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Form({
  setShowEdit,
  type,
}: {
  type: string;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const pathName = usePathname();
  const board = pathName.split("/boards/")[1];
  const boardName = decodeURIComponent(board);

  const [data, setData] = useState<IBoard | null>();

  useEffect(() => {
    async function getData() {
      const fetchData = await fetch(
        `http://localhost:3000/api/boards/${boardName}`
      );
      const data = await fetchData.json();
      setData(data);
    }
    if (boardName) getData();
  }, [boardName]);
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center 
      justify-center z-50"
      onClick={() => setShowEdit(false)}
    >
      <div className="bg-white p-[2.4rem]">
        <h1>{type === "board" ? "Edit Board" : "Edit Task"}</h1>
        <div>
          <label htmlFor="name">
            {type === "board" ? "Board Name" : "Title"}{" "}
          </label>
          <input type="text" name="name" />
        </div>
        {type === "board" && (
          <div>
            <p>Board Columns</p>
            {data?.columns.map((item) => (
              <div>
                <p>{item.name}</p>
              </div>
            ))}
            <button>+ Add New Column</button>
          </div>
        )}
        {type === "task" && (
          <div>
            <div>
              <p>Description</p>
              <textarea
                placeholder="e.g It's always good to take a break. 
          This 15 minute break will recharge the batteries a little"
              ></textarea>
            </div>
            <div>
              <p>Subtasks</p>
              {data?.columns.map((col) =>
                col.tasks.map((task) => (
                  <div>
                    <p>{task.title}</p>
                  </div>
                ))
              )}
            </div>
            <button>+ Add New Subtask</button>
            {/* <div>
              <p>Status</p>
              <div>{data?.columns.}</div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
