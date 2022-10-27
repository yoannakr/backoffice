import { useEffect, useState } from "react";
import { getUsers } from "../../../../../user/userAPI";

export interface IUserOption {
  label: string;
  value: string;
}

export const useUsersOptions = () => {
  const [usersOptions, setUsersOptions] = useState<IUserOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersOptions = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        const mappedOptions = response.data.map(
          (userOption: { id: number; username: string }) => ({
            value: userOption.id,
            label: `${userOption.username} (${userOption.id})`,
          })
        );
        setUsersOptions(mappedOptions);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUsersOptions();
  }, []);

  return { usersOptions, loading };
};
