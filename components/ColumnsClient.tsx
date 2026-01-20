"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Task from "./Task";
import { useRouter } from "next/navigation";
import Empty from "./Empty";

export default function ColumnsClient({
  boardsData,
  boardName,
}: {
  boardsData: IBoard;
  boardName: string;
}) {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel();
  const [selectedTask, setSelectedTask] = useState<{
    task: ITask;
    columnName: string;
  } | null>();

  const [columns, setColumns] = useState<TColumns>({ name: "", tasks: [] });
  const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false);
  const [columnTitleError, setColumnTitleError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  async function addNewColumn() {
    if (!columns.name) {
      setColumnTitleError(true);
      return;
    }
    try {
      const postData = await fetch(`/api/boards/${boardName}/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(columns),
      });
      router.refresh();
      setShowAddColumnForm(false);
    } catch (err) {
      console.error(`cant be addded: ${err}`);
    }
  }

  useEffect(() => {
    setIsEmpty(boardsData.columns.length === 0);
  }, [boardsData]);

  return (
    <>
      {isEmpty ? (
        <Empty setShowAddColumnForm={setShowAddColumnForm} />
      ) : (
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
              <div
                className="min-h-screen flex items-center
            justify-center px-[5.55rem]
            bg-[linear-gradient(to_bottom,#e9effa,rgba(233,239,250,0.5))]
            mt-[4rem] rounded-[0.6rem]"
                onClick={() => setShowAddColumnForm(true)}
              >
                <p
                  className="text-[2.4rem] font-bold
            text-[#828fa3] shrink-0"
                >
                  +New Column
                </p>
              </div>
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
      )}
      {showAddColumnForm && (
        <div
          className="fixed inset-0 bg-black/50 z-40 p-[1.6rem]
          flex items-center justify-center"
          onClick={() => setShowAddColumnForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white
           py-[2.4rem] px-[2.4rem]
           rounded-[0.6rem]
           "
          >
            <p
              className="text-[1.2rem] font-bold
                text-[#828fa3] mb-[0.8rem]"
            >
              Title
            </p>
            <div
              className="py-[0.8rem] px-[1.6rem]
                  border border-[rgba(130,143,163,0.25)]
                  w-full rounded-[0.4rem]"
            >
              <input
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  setColumns((prev) => ({ ...prev, name: val }));
                }}
                className="text-[1.3rem]
                        font-[500] leading-[1.77] text-[#000112]
                        outline-none"
              />
              {columnTitleError && (
                <span
                  className="text-[1.3rem]
                  font-[500] leading-[1.77]
                  text-[#ea5555] shrink-0"
                >
                  Can't be empty
                </span>
              )}
            </div>
            <button
              onClick={() => {
                addNewColumn();
              }}
              className="bg-[#635fc7] rounded-[2rem] py-[0.8rem] w-full
              text-white font-bold text-[1.3rem] leading-[1.77]
              mt-[2.4rem]"
            >
              ADD NEW COLUMN
            </button>
          </div>
        </div>
      )}
    </>
  );
}
