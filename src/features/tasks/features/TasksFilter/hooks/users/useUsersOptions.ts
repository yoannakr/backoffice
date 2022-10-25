import { useEffect, useState } from "react";
import { getUsers } from "../../../../../user/userAPI";

export interface IUserOption {
  label: string;
  value: string;
}

export const useUsersOptions = (): IUserOption[] => {
  const [usersOptions, setUsersOptions] = useState<IUserOption[]>([]);

  useEffect(() => {
    const fetchUsersOptions = async () => {
      try {
        const response = await getUsers();
        const mappedOptions = response.data.map(
          (userOption: { id: number; username: string }) => ({
            value: userOption.id,
            label: `${userOption.username} (${userOption.id})`,
          })
        );
        setUsersOptions(mappedOptions);
      } catch (error) {}
    };

    fetchUsersOptions();
  }, []);

  return usersOptions;
};
