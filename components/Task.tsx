export default function Task({ task }: { task: ITask }) {
  return (
    <div
      className="pt-[2.4rem] pb-[3.2rem]
        px-[2.4rem] bg-white rounded-[0.6rem]
        z-50 flex flex-col gap-[2.4rem]
        w-full min-w-[34rem] max-w-[48rem]
        "
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[1.8rem] font-bold text-[#000112]">{task.title}</h1>
        <svg
          className="shrink-0 cursor-pointer"
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
      </div>
      <p
        className="text-[1.3rem] font-[500]
        leading-[1.77] text-[#828fa3]"
      >
        {task.description}
      </p>
      <div className="flex flex-col gap-[0.8rem]">
        <p
          className="text-[1.2rem] font-bold text-[#828fa3]
        font-bold"
        >
          Subtasks ({task.subtasks.filter((sub) => sub.isCompleted).length} of{" "}
          {task.subtasks.length})
        </p>
        {task.subtasks.map((sub, index) => (
          <div
            key={index}
            className="pl-[1.2rem] pr-[0.8rem]
            pt-[1.3rem] pb-[1.6rem]
            flex items-center gap-[1.6rem]
            bg-[#f3f7fd] rounded-[0.4rem]
            "
          >
            {sub.isCompleted ? (
              <div
                className="w-[1.6rem] h-[1.6rem]
            rounded-[0.2rem] border border-[#636fc7]
            bg-[#636fc7] flex items-center justify-center
            shrink-0"
              >
                <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="#FFF"
                    strokeWidth="2"
                    fill="none"
                    d="m1.276 3.066 2.756 2.756 5-5"
                  />
                </svg>
              </div>
            ) : (
              <div
                className="w-[1.6rem] h-[1.6rem] shrink-0
            rounded-[0.2rem] border border-[rgba(130,143,163,0.25)]"
              ></div>
            )}
            {sub.isCompleted ? (
              <p
                className="text-[1.2rem] opacity-[0.5] 
              font-bold line-through
              text-[#00112]"
              >
                {sub.title}
              </p>
            ) : (
              <p
                className="text-[1.2rem]
              font-bold 
              text-[#00112]"
              >
                {sub.title}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <p
          className="text-[1.2rem] font-bold text-[#828fa3]
        font-bold"
        >
          Current Status
        </p>
        <div
          className="py-[0.8rem] px-[1.6rem] 
            rounded-[0.4rem] border border-[rgba(130,143,163,0.25)]
            flex items-center justify-between"
        >
          <span
            className="text-[1.3rem] font-[500] 
          leading-[1.77] text-[#000112]"
          >
            {task.status}
          </span>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
