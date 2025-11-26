"use client";
import { useState } from "react";
import Edit_DeleteDropDown from "./Edit_DeleteDropDown";
import Form from "./Form";

export default function ThreeDotMenu({ type }: { type: string }) {
  const [showEditDelete, setShowEditDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const handleMenu = () => {
    if (showEditDelete) {
      setShowEditDelete(false);
    } else {
      setShowEditDelete(true);
    }
  };
  return (
    <div>
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
          setShowEditDelete={setShowEditDelete}
          setShowEdit={setShowEdit}
          setShowDelete={setShowDelete}
        />
      )}
      {showEdit && <Form type={type} setShowEdit={setShowEdit} />}
    </div>
  );
}
