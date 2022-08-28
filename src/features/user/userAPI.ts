import { axios } from "../../lib/axios";

export const getUsers = async () => {
  return await axios.get("/users");
};

type GetUserOptions = {
  userId: number;
};

export const getUser = async (props: GetUserOptions) => {
  const { userId } = props;

  return await axios.get(`/users/${userId}`);
};
