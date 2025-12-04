"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import Task from "./Task";

export default function ColumnsClient({
  boardsData,
  boardName,
}: {
  boardsData: IBoard;
  boardName: string;
}) {
  const [emblaRef] = useEmblaCarousel();
  const [selectedTask, setSelectedTask] = useState<{
    task: ITask;
    columnName: string;
  } | null>();

  return (
    <div className="embla py-[2.4rem] px-[1.6rem]">
      <div className="embla_viewport overflow-hidden" ref={emblaRef}>
        <div className="embla_container flex gap-[2.4rem]">
          {boardsData.columns.map((col: TColumns, index) => (
            <div
              key={index}
              className="embla_slide flex-[0_0_28rem]
            "
            >
              <div
                className="flex gap-[1.2rem] mb-[2.4rem]
              "
              >
                <div
                  className={`w-[1.5rem] h-[1.5rem] rounded-full ${
                    col.name === "Todo"
                      ? "bg-[#49c4e5]"
                      : col.name === "Doing"
                      ? "bg-[#8471f2]"
                      : "bg-[#67e2ae]"
                  }`}
                ></div>
                <p
                  className="text-[1.2rem] tracking-[0.24] text-[#828fa3]
                font-bold"
                >
                  {col.name} <span>({col.tasks.length})</span>
                </p>
              </div>

              <div className="flex flex-col gap-[2rem]">
                {col.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="px-[1.6rem] py-[2.3rem]
                    bg-white shadow-[0_0.4rem_0.6rem_0_rgba(54,78,126,0.1)]
                    rounded-[0.8rem] flex flex-col gap-[0.8rem]
                    cursor-pointer"
                    onClick={() => {
                      setSelectedTask({ task, columnName: col.name });
                    }}
                  >
                    <h1 className="text-[1.5rem] text-[#00112] font-bold">
                      {task.title}
                    </h1>
                    <p
                      className="text-[1.2rem] font-bold
                    text-[#828fa3] flex gap-[0.3rem]"
                    >
                      <span>
                        {
                          task.subtasks.filter(
                            (subTask: TSubtasks) => subTask.isCompleted
                          ).length
                        }
                      </span>
                      of
                      <span>{task.subtasks.length}</span>
                      subtasks
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/50 z-50 p-[1.6rem]
        flex items-center justify-center"
          onClick={() => {
            setSelectedTask(null);
          }}
        >
          <Task
            selectedTask={selectedTask.task}
            boardName={boardName}
            columnName={selectedTask.columnName}
            setSelectedTask={setSelectedTask}
          />
        </div>
      )}
    </div>
  );
}
