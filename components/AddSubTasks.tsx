import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

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
    index: number
  ) => void;
  subTaskDeleteHandler: (title: number) => void;
  errorSubTasks: number[];
  addNewSubtTask: () => void;
  isFreshTask?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <p className="text-[1.2rem] font-bold text-[#828fa3]">Subtasks</p>
      <div className="flex flex-col gap-[1.2rem]">
        {localTask?.subtasks.map((sub, idx) => (
          <div className="flex items-center gap-[1.6rem]" key={idx}>
            <div
              className="py-[0.8rem] px-[1.6rem]
                border border-[rgba(130,143,163,0.25)]
                w-full rounded-[0.4rem]"
            >
              <input
                type="text"
                value={sub.title}
                className="text-[1.3rem]
                font-[500] leading-[1.77] text-[#000112]
                outline-none w-full"
                placeholder="e.g. Do something"
                onChange={(e) => {
                  if (isFreshTask) {
                    setTaskState?.((prev) => {
                      const updated = {
                        ...prev,
                        subtasks: prev.subtasks.map((s, i) =>
                          i === idx ? { ...s, title: e.target.value } : s
                        ),
                      };
                      return updated;
                    });
                  } else {
                    setLocalTask?.((prev) => {
                      const updated = {
                        ...prev,
                        subtasks: prev.subtasks.map((s, i) =>
                          i === idx ? { ...s, title: e.target.value } : s
                        ),
                      };
                      return updated;
                    });
                  }
                  subTaskErrorHandler(e, idx);
                }}
              />
            </div>
            <svg
              className="shrink-0 cursor-pointer"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => subTaskDeleteHandler(idx)}
            >
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
            {errorSubTasks.includes(idx) && (
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
          onClick={addNewSubtTask}
        >
          + Add New Subtask
        </button>
      </div>
    </div>
  );
}
