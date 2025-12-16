"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Edit_DeleteDropDown from "./Edit_DeleteDropDown";
import Form from "./Form";
import DeletePopUp from "./DeletePopUp";

export default function ThreeDotMenu({
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
  setLocalTask?: Dispatch<SetStateAction<ITask>>;
  onStatusChange?: Dispatch<SetStateAction<string>>;
  boards?: TBoards;
}) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEditDelete, setShowEditDelete] = useState<boolean>(false);

  const handleMenu = () => {
    if (showEditDelete) {
      setShowEditDelete(false);
    } else {
      setShowEditDelete(true);
    }
  };
  return (
    <div className="cursor-pointer relative">
      <svg
        onClick={handleMenu}
        width="5"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      {showEditDelete && (
        <Edit_DeleteDropDown
          type={type}
          setShowEditDelete={setShowEditDelete}
          setShowEdit={setShowEdit}
          setShowDelete={setShowDelete}
        />
      )}
      {showEdit && (
        <Form
          type={type}
          setShowEdit={setShowEdit}
          boardName={boardName}
          columnName={columnName}
          taskName={taskName}
          setSelectedTask={setSelectedTask}
          localTask={localTask}
          setLocalTask={setLocalTask}
          onStatusChange={onStatusChange}
          boards={boards}
        />
      )}
      {showDelete && (
        <DeletePopUp
          type={type}
          setShowDelete={setShowDelete}
          boardName={boardName}
          columnName={columnName}
          taskName={localTask?.title}
          setSelectedTask={setSelectedTask}
        />
      )}
    </div>
  );
}
