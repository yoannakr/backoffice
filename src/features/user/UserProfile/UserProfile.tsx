import { useParams } from "react-router-dom";
import { BOSpin } from "../../../shared/components";
import { UserDetails } from "../UserDetails/UserDetails";
import { useUser } from "./hooks/users/useUser";
import styles from "./UserProfile.module.scss";

export const UserProfile = () => {
  const params = useParams();
  const userId: number = params.userId !== undefined ? +params.userId : 0;
  const { user, loading, error } = useUser({ userId });

  return (
    <div className={styles.Container}>
      {loading && <BOSpin className={styles.CenterContainer} size="large" />}
      {user && (
        <>
          <h1 className={styles.Title}>User Details</h1>
          <div className={styles.UserDetails}>
            <UserDetails user={user} />
          </div>
        </>
      )}
      {error && (
        <h1 className={`${styles.CenterContainer} ${styles.Title}`}>{error}</h1>
      )}
    </div>
  );
};
