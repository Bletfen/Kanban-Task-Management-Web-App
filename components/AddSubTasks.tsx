import React, { Dispatch, SetStateAction } from "react";

export default function AddSubTasks({
  localTask,
  setLocalTask,
  subTaskErrorHandler,
  addNewSubtTask,
  subTaskDeleteHandler,
  errorSubTasks,
}: {
  localTask: ITask | undefined;
  setLocalTask: Dispatch<SetStateAction<ITask>> | undefined;
  subTaskErrorHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  addNewSubtTask: () => void;
  subTaskDeleteHandler: (title: string) => void;
  errorSubTasks: number[] | undefined;
}) {
  return (
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
                  text-[#000112] outline-none w-full"
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
              {errorSubTasks?.includes(index) && (
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
              className="shrink-0 cursor-pointer"
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
