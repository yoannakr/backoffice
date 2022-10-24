import { axios } from "../../../../lib/axios";

export const fetchTasksAPI = async () => {
  return await axios.get("/todos");
};
