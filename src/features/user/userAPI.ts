import { axios } from "../../lib/axios";

export const getUsers = async () => {
  return await axios.get("/users");
};
