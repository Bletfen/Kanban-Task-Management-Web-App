"use client";

import { useEffect, useState } from "react";

export default function StatusDropDown({
  changeStatus,
  statusChangeHandler,
  boardName,
}: {
  changeStatus?: (newStatus: string) => Promise<void>;
  statusChangeHandler?: (st: string) => void;
  boardName: string;
}) {
  const [names, setNames] = useState<string[] | null>([]);
  const columnsNames = async () => {
    try {
      const response = await fetch(`/api/boards/${boardName}`);
      const boardData = await response.json();
      const columnsNamesArray = boardData.columns.map((c: TColumns) => c.name);
      setNames(columnsNamesArray);
    } catch (err) {
      console.error("Failed to fetch column names:", err);
    }
  };

  useEffect(() => {
    columnsNames();
  }, []);
  return (
    <div
      className="absolute top-20 left-0
        p-[1.6rem] bg-white rounded-[0.8rem]
        shadow-[0_1rem_2rem_0_rgba(54,78,126,0.25)]
        w-full
        flex flex-col gap-[0.8rem]
        text-[1.3rem] font-[500] text-[#828fa3]"
    >
      {names?.map((n) => (
        <p
          key={n}
          onClick={() => {
            changeStatus?.(n);
            statusChangeHandler?.(n);
          }}
        >
          {n}
        </p>
      ))}
    </div>
  );
}
