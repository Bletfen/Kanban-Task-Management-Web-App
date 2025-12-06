import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import StatusDropDown from "./StatusDropDown";
import ThreeDotMenu from "./ThreeDotMenu";

export default function Task({
  selectedTask,
  boardName,
  columnName,
  setSelectedTask,
}: {
  selectedTask: ITask;
  boardName: string;
  columnName: string;
  setSelectedTask: Dispatch<
    SetStateAction<
      | {
          task: ITask;
          columnName: string;
        }
      | null
      | undefined
    >
  >;
}) {
  const router = useRouter();
  const [localTask, setLocalTask] = useState(selectedTask);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<string>(columnName);

  const saveTask = async (subtaskIndex: number) => {
    const updateSubTasks = localTask.subtasks.map((sub, index) =>
      index === subtaskIndex ? { ...sub, isCompleted: !sub.isCompleted } : sub
    );

    const updatedTask = {
      ...localTask,
      subtasks: updateSubTasks,
    };

    setLocalTask(updatedTask);

    try {
      const response = await fetch(
        `/api/boards/${encodeURIComponent(
          boardName
        )}/columns/${encodeURIComponent(
          currentColumn
        )}/tasks/${encodeURIComponent(selectedTask.title)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subtasks: updateSubTasks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("failed to update task");
      }
      router.refresh();
    } catch {
      setLocalTask(selectedTask);
    }
  };

  const changeStatus = async (newStatus: string) => {
    const updatedTask = {
      ...localTask,
      status: newStatus,
    };

    setLocalTask(updatedTask);
    setShowMenu(false);

    try {
      const response = await fetch(
        `/api/boards/${encodeURIComponent(
          boardName
        )}/columns/${encodeURIComponent(
          currentColumn
        )}/tasks/${encodeURIComponent(selectedTask.title)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error("failed to update task");
      }

      setCurrentColumn(newStatus);
      setShowMenu(false);
      router.refresh();
    } catch {
      setLocalTask(selectedTask);
    }
  };

  return (
    <div
      className="pt-[2.4rem] pb-[3.2rem]
        px-[2.4rem] bg-white rounded-[0.6rem]
        z-50 flex flex-col gap-[2.4rem]
        w-full min-w-[34rem] max-w-[48rem]
        "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[1.8rem] font-bold text-[#000112]">
          {localTask?.title}
        </h1>
        <ThreeDotMenu
          type={"task"}
          boardName={boardName}
          columnName={currentColumn}
          taskName={selectedTask.title}
          setSelectedTask={setSelectedTask}
          localTask={localTask}
          setLocalTask={setLocalTask}
        />
      </div>
      <p
        className="text-[1.3rem] font-[500]
        leading-[1.77] text-[#828fa3]
        break-words"
      >
        {localTask?.description}
      </p>
      <div className="flex flex-col gap-[0.8rem]">
        <p
          className="text-[1.2rem] font-bold text-[#828fa3]
        font-bold"
        >
          Subtasks (
          {localTask?.subtasks.filter((sub) => sub.isCompleted).length} of{" "}
          {localTask?.subtasks.length})
        </p>
        {localTask?.subtasks.map((sub, index) => (
          <div
            key={index}
            className="pl-[1.2rem] pr-[0.8rem]
            pt-[1.3rem] pb-[1.6rem]
            flex items-center gap-[1.6rem]
            bg-[#f3f7fd] rounded-[0.4rem]
            hover:bg-[#635fc7]/25 cursor-pointer
            transition-all duration-300
            "
            onClick={() => saveTask(index)}
          >
            {sub.isCompleted ? (
              <div
                className="w-[1.6rem] h-[1.6rem]
            rounded-[0.2rem] border border-[#636fc7]
            bg-[#636fc7] flex items-center justify-center
            shrink-0"
              >
                <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="#FFF"
                    strokeWidth="2"
                    fill="none"
                    d="m1.276 3.066 2.756 2.756 5-5"
                  />
                </svg>
              </div>
            ) : (
              <div
                className="w-[1.6rem] h-[1.6rem] shrink-0
            rounded-[0.2rem] border border-[rgba(130,143,163,0.25)]"
              ></div>
            )}
            {sub.isCompleted ? (
              <p
                className="text-[1.2rem] opacity-[0.5] 
              font-bold line-through
              text-[#00112]"
              >
                {sub.title}
              </p>
            ) : (
              <p
                className="text-[1.2rem]
              font-bold 
              text-[#00112]"
              >
                {sub.title}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <p
          className="text-[1.2rem] font-bold text-[#828fa3]
        font-bold"
        >
          Current Status
        </p>
        <div
          className={`py-[0.8rem] px-[1.6rem] 
            rounded-[0.4rem] border
            flex items-center justify-between
            relative cursor-pointer
            transition-all duration-300
            ${
              showMenu ? "border-[#635fc7]" : "border-[rgba(130,143,163,0.25)]"
            }`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span
            className="text-[1.3rem] font-[500] 
          leading-[1.77] text-[#000112]"
          >
            {localTask?.status}
          </span>
          {!showMenu ? (
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          ) : (
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="M9 6 5 2 1 6"
              />
            </svg>
          )}
          {showMenu && <StatusDropDown changeStatus={changeStatus} />}
        </div>
      </div>
    </div>
  );
}
