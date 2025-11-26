interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: TSubtasks[];
}

type TSubtasks = {
  title: string;
  isCompleted: boolean;
};

type TColumns = {
  name: string;
  tasks: ITask[];
};

interface IBoard {
  name: string;
  columns: TColumns[];
}

type TBoards = IBoard[];
