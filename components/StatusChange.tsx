import { Dispatch, SetStateAction } from "react";
import StatusDropDown from "./StatusDropDown";

export default function StatusChange({
  setShowDropDown,
  status,
  showDropDown,
  statusChangeHandler,
}: {
  setShowDropDown: Dispatch<SetStateAction<boolean>>;
  status: string | undefined;
  showDropDown: boolean;
  statusChangeHandler: (st: string) => void;
}) {
  return (
    <div>
      <p className="text-[1.2rem] font-bold text-[#828fa3]">Status</p>
      <div
        className="py-[0.9rem] px-[1.6rem] bg-white
            border border-[rgba(130,143,163,0.25)]
            bg-white flex items-center justify-between
            rounded-[0.4rem] relative
            cursor-pointer"
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <p
          className="text-[1.3rem] font-[500] leading-[1.77]
                  text-[#000112]"
        >
          {status}
        </p>
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
        </svg>
        {showDropDown && (
          <StatusDropDown statusChangeHandler={statusChangeHandler} />
        )}
      </div>
    </div>
  );
}
