import { IUser } from "./../../../../../types/user";
import { useEffect, useState } from "react";
import { getUser } from "../../../userAPI";

interface Props {
  userId: number;
}
export interface IUserOption {
  label: string;
  value: string;
}

export const useUser = (props: Props): IUser | undefined => {
  const { userId } = props;
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ userId });
        setUser(response.data as IUser);
      } catch (error) {}
    };

    fetchUser();
  }, []);

  return user;
};
