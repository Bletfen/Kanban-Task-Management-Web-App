import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function AddSubTasks({
  localTask,
  setLocalTask,
  setTaskState,
  subTaskErrorHandler,
  subTaskDeleteHandler,
  errorSubTasks,
  addNewSubtTask,
  isFreshTask,
}: {
  localTask: ITask;
  setLocalTask?: Dispatch<SetStateAction<ITask>> | undefined;
  setTaskState?: Dispatch<SetStateAction<ITask>> | undefined;
  subTaskErrorHandler: (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  subTaskDeleteHandler: (title: number) => void;
  errorSubTasks: number[];
  addNewSubtTask: () => void;
  isFreshTask?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <p
        className="text-[1.2rem] font-bold text-[#828fa3]
          transition-all duration-300
          dark:text-white"
      >
        Subtasks
      </p>
      <div className="flex flex-col gap-[1.2rem]">
        {localTask?.subtasks.map((sub, idx) => (
          <div className="flex items-center gap-[1.6rem]" key={idx}>
            <div
              className={`py-[0.8rem] px-[1.6rem]
                border flex items-center
                w-full rounded-[0.4rem]
                focus-within:border-[#635fc7]
                transition-all duration-300
                ${errorSubTasks.includes(idx) ? "border-[#ea5555]" : "border-[rgba(130,143,163,0.25)]"}`}
            >
              <input
                type="text"
                value={sub.title}
                className="text-[1.3rem]
                font-[500] leading-[1.77] text-[#000112]
                outline-none w-full dark:bg-[#2b2c37] dark:text-white
                break-all
                "
                placeholder="e.g. Do something"
                maxLength={50}
                onChange={(e) => {
                  if (isFreshTask) {
                    setTaskState?.((prev) => {
                      const updated = {
                        ...prev,
                        subtasks: prev.subtasks.map((s, i) =>
                          i === idx ? { ...s, title: e.target.value } : s,
                        ),
                      };
                      return updated;
                    });
                  } else {
                    setLocalTask?.((prev) => {
                      const updated = {
                        ...prev,
                        subtasks: prev.subtasks.map((s, i) =>
                          i === idx ? { ...s, title: e.target.value } : s,
                        ),
                      };
                      return updated;
                    });
                  }
                  subTaskErrorHandler(e, idx);
                }}
              />
              {errorSubTasks.includes(idx) && (
                <span
                  className="text-[1.2rem] text-[#ea5555] font-[500]
                shrink-0"
                >
                  Can't be empty
                </span>
              )}
            </div>
            <svg
              className="shrink-0 cursor-pointer text-[#828fa3] hover:text-[#ea5555]
              transition-all duration-300"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => subTaskDeleteHandler(idx)}
            >
              <g fill="currentColor" fillRule="evenodd">
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
              text-[#635fc7] cursor-pointer
              transition-all duration-300
              hover:bg-[rgba(99,95,199,0.25)]
              dark:bg-white"
          type="button"
          onClick={addNewSubtTask}
        >
          + Add New Subtask
        </button>
      </div>
    </div>
  );
}
