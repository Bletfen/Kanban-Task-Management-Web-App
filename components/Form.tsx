"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddSubTasks from "./AddSubTasks";
import StatusChange from "./StatusChange";

export default function Form({
  setShowEdit,
  type,
  boardName,
  columnName,
  taskName,
  setSelectedTask,
  localTask,
  setLocalTask,
  onStatusChange,
  boards,
}: {
  type: string;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  boardName: string;
  columnName?: string;
  taskName?: string;
  setSelectedTask?: Dispatch<
    SetStateAction<
      | {
          task: ITask;
          columnName: string;
        }
      | null
      | undefined
    >
  >;
  localTask?: ITask;
  setLocalTask?: Dispatch<SetStateAction<ITask>> | undefined;
  onStatusChange: Dispatch<SetStateAction<string>> | undefined;
  boards: TBoards | undefined;
}) {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorSubTasks, setErrorSubTasks] = useState<number[]>([]);
  const currentBoard = boards?.find((b) => b.name === boardName);
  const [boardTitle, setBoardTitle] = useState<string>(
    currentBoard?.name || boardName
  );
  const [columns, setColumns] = useState<TColumns[]>(
    currentBoard?.columns || []
  );
  const [columnErrors, setColumnErrors] = useState<number[]>([]);

  const titleErrorHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
  };
  const subTaskErrorHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.value.trim()) {
      setErrorSubTasks((prev) => [...prev, index]);
    } else {
      setErrorSubTasks((prev) => prev.filter((i) => i !== index));
    }
  };

  const subTaskDeleteHandler = (title: string) => {
    setLocalTask?.((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((sub) => sub.title !== title),
    }));
  };

  const statusChangeHandler = (st: string) => {
    setLocalTask?.((prev) => ({
      ...prev,
      status: st,
    }));
  };

  const addNewSubtTask = () => {
    setLocalTask?.((prev) => ({
      ...prev,
      subtasks: [...prev!.subtasks, { title: "", isCompleted: false }],
    }));
  };

  const editTaskHandler = async () => {
    if (type === "task") {
      if (!boardName || !columnName || !taskName || !localTask?.title) return;
      if (!localTask?.title.trim()) {
        setErrorTitle(true);
        return;
      }
      const emptySubTasks = localTask?.subtasks
        .map((sub, index) => (!sub.title.trim() ? index : -1))
        .filter((i) => i !== -1);
      if (emptySubTasks && emptySubTasks.length > 0) {
        setErrorSubTasks(emptySubTasks);
        return;
      }
      try {
        const res = await fetch(
          `/api/boards/${encodeURIComponent(
            boardName
          )}/columns/${encodeURIComponent(
            columnName
          )}/tasks/${encodeURIComponent(taskName)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(localTask),
          }
        );
        if (!res.ok) {
          throw new Error("Can not edit task");
        }
        if (localTask.status && localTask.status !== columnName) {
          onStatusChange?.(localTask.status);
        }
        setShowEdit(false);
        setSelectedTask?.(null);
        router.refresh();
      } catch {
        if (localTask && setLocalTask) setLocalTask(localTask);
      }
    } else {
      // board editing
      if (!boardTitle.trim()) {
        setErrorTitle(true);
        return;
      }
      const emptyCols = columns
        .map((col, idx) => (!col.name.trim() ? idx : -1))
        .filter((i) => i !== -1);
      if (emptyCols.length) {
        setColumnErrors(emptyCols);
        return;
      }
      setColumnErrors([]);
      try {
        const res = await fetch(
          `/api/boards/${encodeURIComponent(boardName)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: boardTitle.trim(),
              columns,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Cannot edit board");
        }
        setShowEdit(false);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addColumns = () => {
    setColumns((prev) => [...prev, { name: "", tasks: [] }]);
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center 
      justify-center z-40"
      onClick={() => {
        setShowEdit(false);
        setSelectedTask?.(null);
      }}
    >
      <div
        className="bg-white p-[2.4rem] rounded-[0.6rem]
          flex flex-col gap-[2.4rem] max-w-[48rem] w-full
          cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[1.8rem] font-bold text-[#000112]">
          Edit {type === "board" ? "Board" : "Task"}
        </h1>
        <div className="flex flex-col gap-[0.8rem]">
          <label
            className="text-[1.2rem] font-bold text-[#828fa3]"
            htmlFor="Title"
          >
            {type === "board" ? "Board Name" : "Title"}
          </label>
          <div
            className="py-[0.9rem] px-[1.6rem] bg-white border
              border-[rgba(130,143,163,0.25)] rounded-[0.4rem]
              flex items-center justify-between"
          >
            <input
              className="w-full
              text-[1.3rem] font-[500] leading-[1.77]
              text-[#000112] outline-none"
              type="text"
              name="Title"
              defaultValue={type === "board" ? boardTitle : localTask?.title}
              onChange={(e) => {
                if (type === "board") {
                  setBoardTitle(e.target.value);
                } else {
                  setLocalTask?.((prev) => ({
                    ...prev!,
                    title: e.target.value,
                  }));
                }
                titleErrorHandler(e);
              }}
              maxLength={100}
            />
            {errorTitle && (
              <span
                className="text-[1.3rem]
                  font-[500] leading-[1.77]
                  text-[#ea5555] shrink-0"
              >
                Can't be empty
              </span>
            )}
          </div>
        </div>
        {type === "task" && (
          <div className="flex flex-col gap-[0.8rem]">
            <label
              className="text-[1.2rem] font-bold text-[#828fa3]"
              htmlFor="Description"
            >
              Description
            </label>

            <textarea
              className="py-[0.9rem] px-[1.6rem] bg-white border
              border-[rgba(130,143,163,0.25)] rounded-[0.4rem]
              text-[1.3rem] font-[500] leading-[1.77]
              text-[#000112] resize-none outline-none"
              name="Description"
              defaultValue={localTask?.description}
              onChange={(e) =>
                setLocalTask?.((prev) => ({
                  ...prev!,
                  description: e.target.value,
                }))
              }
              maxLength={350}
            ></textarea>
          </div>
        )}
        {type === "task" && (
          <AddSubTasks
            localTask={localTask}
            setLocalTask={setLocalTask}
            subTaskErrorHandler={subTaskErrorHandler}
            subTaskDeleteHandler={subTaskDeleteHandler}
            errorSubTasks={errorSubTasks}
            addNewSubtTask={addNewSubtTask}
          />
        )}
        <div className="flex flex-col gap-[0.8rem]">
          {type === "task" && (
            <StatusChange
              setShowDropDown={setShowDropDown}
              status={localTask?.status}
              showDropDown={showDropDown}
              statusChangeHandler={statusChangeHandler}
            />
          )}
          {type === "board" && (
            <div className="flex flex-col gap-[0.8rem]">
              <p
                className="text-[1.2rem] font-bold
                text-[#828fa3]"
              >
                Board Columns
              </p>
              <div className="flex flex-col gap-[1.2rem]">
                {columns.map((c, idx) => (
                  <div className="flex items-center gap-[1.6rem]" key={idx}>
                    <div
                      className="py-[0.8rem] px-[1.6rem]
                  border border-[rgba(130,143,163,0.25)]
                  w-full rounded-[0.4rem]"
                    >
                      <input
                        type="text"
                        value={c.name}
                        className="text-[1.3rem]
                        font-[500] leading-[1.77] text-[#000112]
                        outline-none"
                        onChange={(e) => {
                          const val = e.target.value;
                          setColumns((prev) =>
                            prev.map((col, i) =>
                              i === idx ? { ...col, name: val } : col
                            )
                          );
                          setColumnErrors((prev) =>
                            prev.filter((i) => i !== idx)
                          );
                        }}
                      />
                    </div>
                    <svg
                      className="shrink-0 cursor-pointer"
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() =>
                        setColumns((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      <g fill="#828FA3" fillRule="evenodd">
                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                      </g>
                    </svg>
                    {columnErrors.includes(idx) && (
                      <span className="text-[1.2rem] text-[#ea5555] font-[500]">
                        Can't be empty
                      </span>
                    )}
                  </div>
                ))}
                <button
                  className="py-[0.9rem] flex items-center
                      justify-center bg-[rgba(99,95,199,0.1)] rounded-[2rem]
                      w-full text-[1.3rem] font-bold leading-[1.77]
                      text-[#635fc7] cursor-pointer"
                  type="button"
                  onClick={addColumns}
                >
                  + Add New Column
                </button>
              </div>
            </div>
          )}
          <button
            className="py-[0.9rem] flex items-center
              justify-center bg-[#635fc7] rounded-[2rem] w-full
              text-[1.3rem] font-bold leading-[1.77] text-white
              cursor-pointer mt-[2.4rem]"
            onClick={() => {
              editTaskHandler();
            }}
          >
            {type === "task" ? "Create Task" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
