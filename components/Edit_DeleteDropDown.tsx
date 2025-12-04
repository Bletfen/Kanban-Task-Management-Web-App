"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function Edit_DeleteDropDown({
  setShowEdit,
  setShowDelete,
  setShowEditDelete,
}: {
  setShowEditDelete: Dispatch<SetStateAction<boolean>>;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <p
        onClick={() => {
          setShowEditDelete(false);
          setShowEdit(true);
        }}
      >
        Edit Board
      </p>
      <p
        onClick={() => {
          setShowEditDelete(false);
          setShowDelete(false);
        }}
      >
        Delete Board
      </p>
    </div>
  );
}
