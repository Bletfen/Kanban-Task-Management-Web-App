"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import StatusDropDown from "./StatusDropDown";

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
}: {
  type: string;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  boardName?: string;
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
}) {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorSubTasks, setErrorSubTasks] = useState<number[]>([]);

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
    if (!boardName || !columnName || !taskName) return;
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
        )}/columns/${encodeURIComponent(columnName)}/tasks/${encodeURIComponent(
          taskName
        )}`,
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
      router.refresh();
    } catch {
      if (localTask && setLocalTask) setLocalTask(localTask);
    }
  };
  console.log(localTask);
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
      flex flex-col gap-[2.4rem] max-w-[48rem] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[1.8rem] font-bold text-[#000112]">Edit Task</h1>
        <div className="flex flex-col gap-[0.8rem]">
          <label
            className="text-[1.2rem] font-bold text-[#828fa3]"
            htmlFor="Title"
          >
            Title
          </label>
          <div
            className="py-[0.9rem] px-[1.6rem] bg-white border
          border-[rgba(130,143,163,0.25)] rounded-[0.4rem]
          flex items-center justify-between"
          >
            <input
              className="w-full
          text-[1.3rem] font-[500] leading-[1.77]
          text-[#000112]"
              type="text"
              name="Title"
              defaultValue={localTask?.title}
              onChange={(e) => {
                setLocalTask?.((prev) => ({ ...prev!, title: e.target.value }));
                setSelectedTask?.((prev) => ({
                  ...prev!,
                  title: e.target.value,
                }));
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
          text-[#000112] resize-none"
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
        <div>
          <p
            className="text-[1.2rem] font-bold text-[#828fa3]
            mb-[0.8rem]"
          >
            Subtasks
          </p>
          <div className="flex flex-col gap-[1.2rem]">
            {localTask?.subtasks.map((sub, index) => (
              <div key={index} className="flex gap-[1.6rem] items-center">
                <div
                  className="py-[0.8rem] px-[1.6rem] border
            border-[rgba(130,143,163,0.25)]
            bg-white rounded-[0.4rem] w-full
            flex items-center justify-between"
                >
                  <input
                    className="text-[1.3rem] font-[500] leading-[1.77]
                  text-[#000112] outline-none"
                    onChange={(e) => {
                      setLocalTask?.((prev) => ({
                        ...prev!,
                        subtasks: prev!.subtasks.map((sub, i) =>
                          i === index ? { ...sub, title: e.target.value } : sub
                        ),
                      }));
                      subTaskErrorHandler(e, index);
                    }}
                    value={sub.title}
                  />
                  {errorSubTasks.includes(index) && (
                    <span
                      className="text-[1.3rem]
                  font-[500] leading-[1.77]
                  text-[#ea5555]"
                    >
                      Can't be empty
                    </span>
                  )}
                </div>
                <svg
                  className="shrink-0"
                  width="15"
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => subTaskDeleteHandler(sub.title)}
                >
                  <g fill="#828FA3" fillRule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </div>
            ))}
            <button
              className="py-[0.9rem] flex items-center
            justify-center bg-[rgba(99,95,199,0.1)] rounded-[2rem]
            w-full text-[1.3rem] font-bold leading-[1.77]
            text-[#635fc7]"
              type="button"
              onClick={addNewSubtTask}
            >
              + Add New Subtask
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className="text-[1.2rem] font-bold text-[#828fa3]">Status</p>
          <div
            className="py-[0.9rem] px-[1.6rem] bg-white
            border border-[rgba(130,143,163,0.25)]
            bg-white flex items-center justify-between
            rounded-[0.4rem] relative"
            onClick={() => setShowDropDown((prev) => !prev)}
          >
            <p
              className="text-[1.3rem] font-[500] leading-[1.77]
                  text-[#000112]"
            >
              {localTask?.status}
            </p>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
            {showDropDown && (
              <StatusDropDown statusChangeHandler={statusChangeHandler} />
            )}
          </div>
        </div>
        <button
          className="py-[0.9rem] flex items-center
          justify-center bg-[#635fc7] rounded-[2rem] w-full
          text-[1.3rem] font-bold leading-[1.77] text-white"
          onClick={() => {
            editTaskHandler();
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
