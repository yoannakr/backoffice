import { IUser } from "./../../../../../types/user";
import { useEffect, useState } from "react";
import { getUser } from "../../../userAPI";
import { AxiosError } from "axios";

interface Props {
  userId: number;
}

export const useUser = (props: Props) => {
  const { userId } = props;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getUser({ userId });
        setUser(response.data as IUser);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.code === "ERR_BAD_REQUEST") {
          setError("User not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
