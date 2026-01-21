"use client";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Form from "./Form";
import { useTheme } from "next-themes";

export default function BoardsDropDown({
  boards,
  setShowBoards,
  type,
  onOpenCreateBoard,
}: {
  boards: TBoards;
  setShowBoards?: Dispatch<SetStateAction<boolean>>;
  type?: string;
  onOpenCreateBoard?: () => void;
}) {
  const router = useRouter();
  const params = useParams();
  const paramsBoardName = params.board;
  const decodedBoardName = decodeURIComponent(
    (Array.isArray(paramsBoardName) ? paramsBoardName[0] : paramsBoardName) ||
      "",
  );
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [addNewBoard, setAddNewBoard] = useState<boolean>(false);

  return (
    <div
      className={`z-50 bg-white
      ${
        type === "tablet"
          ? "relative top-0 left-0 w-full shadow-none mt-[5.4rem] md:flex md:flex-col md:justify-between md:min-h-screen"
          : "absolute top-25 left-15 w-[26.4rem] shadow-[0_10px_20px_rgba(54,78,126,0.25)] py-[1.6rem] rounded-[0.8rem] md:hidden"
      }`}
    >
      <div className="pr-[2.4rem]">
        <h1
          className="text-[1.2rem] tracking-[0.24rem] text-[#828fa3]
        font-bold pl-[2.4rem] mb-[1.9rem]"
        >
          ALL BOARDS ({boards.length})
        </h1>
        {boards.map((b, index) => (
          <div key={Math.random() * index}>
            <div
              className={`flex items-center gap-[1.2rem]
              cursor-pointer pl-[2.4rem]
              py-[1.4rem]
              ${
                decodedBoardName === b.name ? "bg-[#635fc7] rounded-r-full" : ""
              }`}
            >
              <svg
                className={`${
                  decodedBoardName === b.name ? "text-white" : "text-[#828fa3]"
                }`}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="currentColor"
                />
              </svg>
              <p
                onClick={() => {
                  setShowBoards?.(false);
                  router.push(`/boards/${b.name}`);
                }}
                className={`text-[1.5rem] font-bold
                  ${
                    decodedBoardName === b.name
                      ? "text-white"
                      : "text-[#828fa3]"
                  }`}
              >
                {b.name}
              </p>
            </div>
          </div>
        ))}
        <div
          className="flex pl-[2.4rem] gap-[1.2rem]
        cursor-pointer py-[1.4rem] items-center
        mb-[1.6rem]"
          onClick={() => {
            if (type === "tablet") {
              onOpenCreateBoard?.();
            } else {
              setAddNewBoard(true);
            }
          }}
        >
          <svg
            className="text-[#635fc7]"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="currentColor"
            />
          </svg>
          <p
            className="text-[1.5rem] text-[#635fc7] font-bold
        "
          >
            + Create New Board
          </p>
        </div>
      </div>
      <div className="px-[2.4rem]">
        <div
          className="flex items-center bg-[#f4f7fd]
        justify-center py-[1.4rem] rounded-[0.6rem]
        gap-[2.3rem]"
        >
          <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
              fill="#828FA3"
            />
          </svg>
          <div
            className="w-[4rem] h-[2rem] rounded-[1.2rem] bg-[#636fc7]
            flex p-[0.3rem] transition-all duration-300 justify-start
            cursor-pointer dark:justify-end"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <div
              className="w-[1.4rem] h-[1.4rem] bg-[#fff]
              rounded-full"
            ></div>
          </div>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
              fill="#828FA3"
            />
          </svg>
        </div>
      </div>
      {addNewBoard && <Form type={"addBoard"} setShowEdit={setAddNewBoard} />}
    </div>
  );
}
