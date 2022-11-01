export interface ITask {
  id: number;
  title: string;
  userId: number;
  isCompleted: boolean;
}
export interface Filter {
  title?: string;
  userId?: number;
  status?: boolean;
}

export enum TaskStatusType {
  COMPLETED = "Completed",
  NOTCOMPLETED = "NotCompleted",
}
