"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import StatusDropDown from "./StatusDropDown";
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
  boardNameFromHeader,
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
  boardNameFromHeader?: string;
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
      setSelectedTask?.(null);
      router.refresh();
    } catch {
      if (localTask && setLocalTask) setLocalTask(localTask);
    }
  };
  console.log(boardName);
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
              defaultValue={
                type === "board" ? boardNameFromHeader : localTask?.title
              }
              onChange={(e) => {
                setLocalTask?.((prev) => ({ ...prev!, title: e.target.value }));
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
        <div>
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
          <div className="flex flex-col gap-[0.8rem] mt-[2.4rem]">
            <StatusChange
              setShowDropDown={setShowDropDown}
              status={localTask?.status}
              showDropDown={showDropDown}
              statusChangeHandler={statusChangeHandler}
            />
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
    </div>
  );
}
