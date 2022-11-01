import { axios } from "../../../../../../../../lib/axios";
import { BOMessage } from "../../../../../../../../shared/components";

export const useUpdateTaskStatus = () => {
  const updateTaskStatus = async (
    taskId: number,
    newTaskStatus: boolean,
    onSuccessfulUpdate: () => void
  ) => {
    try {
      await axios.patch(`/todos/${taskId}`, {
        completed: newTaskStatus,
      });
      onSuccessfulUpdate();
      BOMessage.success("Task was successful updated.");
    } catch (error) {
      BOMessage.error("Error occurred on updating task.");
    }
  };

  return [updateTaskStatus] as const;
};
