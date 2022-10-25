export interface ITask {
  id: number;
  title: string;
  userId: number;
  isCompleted: boolean;
}

export enum TaskStatusType {
  COMPLETED = "Completed",
  NOTCOMPLETED = "NotCompleted",
}
