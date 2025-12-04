import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function DeletePopUp({
  type,
  setShowDelete,
  boardName,
  columnName,
  taskName,
  setSelectedTask,
}: {
  type: string;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
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
}) {
  const router = useRouter();

  const deleteTask = async () => {
    if (!boardName || !columnName || !taskName) return;
    try {
      const res = await fetch(
        `/api/boards/${encodeURIComponent(
          boardName
        )}/columns/${encodeURIComponent(columnName)}/tasks/${encodeURIComponent(
          taskName
        )}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
      setSelectedTask?.(null);
    } catch {
      throw new Error("Couldn't delete task");
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center 
      justify-center z-50"
      onClick={() => setShowDelete(false)}
    >
      <div
        className="bg-white p-[2.4rem]
        w-[34.3rem] md:w-[48rem]
        flex flex-col gap-[2.4rem]
        rounded-[0.6rem]
        md:pt-[3.2rem] px-[3.2rem] pb-[4rem]"
      >
        <div className="flex flex-col gap-[2.4rem]">
          <h1 className="text-[1.8rem] font-bold text-[#ea5555]">
            Delete this task?
          </h1>
          <p className="text-[1.3rem] font-[500] text-[#828fa3]">
            Are you sure you want to delete the ‘Build settings UI’ task and its
            subtasks? This action cannot be reversed.
          </p>
        </div>
        <div
          className="flex flex-col gap-[1.6rem]
        md:flex-row"
        >
          <button
            className="py-[0.9rem] w-full
          rounded-[2rem] bg-[#ea5555]
          text-[1.3rem] leading-[1.77]
          font-bold text-white
          cursor-pointer"
            onClick={deleteTask}
          >
            Delete
          </button>
          <button
            className="py-[0.9rem] w-full
          rounded-[2rem] bg-[rgba(99,95,199,0.1)]
          text-[1.3rem] leading-[1.77]
          font-bold text-[#635fc7]
          cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
