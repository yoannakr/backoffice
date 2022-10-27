import { useParams } from "react-router-dom";
import { UserDetails } from "../UserDetails/UserDetails";
import { useUser } from "./hooks/users/useUser";
import styles from "./UserProfile.module.scss";

export const UserProfile = () => {
  const params = useParams();
  const userId: number = params.userId !== undefined ? +params.userId : 0;
  const user = useUser({ userId });

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>User Details</h1>
      <div className={styles.UserDetails}>
        <UserDetails user={user} />
      </div>
    </div>
  );
};
