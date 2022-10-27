import { useAppDispatch } from "../../../../../../app/hooks";
import { BOButton, BOTag, BOModal } from "../../../../../../shared/components";
import { ITask } from "../../../../../../types/tasks";
import { changeTaskStatus } from "../../tasksGridSlice";
import {
  BorderOutlined,
  CheckSquareOutlined,
  UserOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Props {
  task: ITask;
}
export const TaskGridRow = (props: Props) => {
  const { task } = props;
  const dispatch = useAppDispatch();

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(task.userId.toString());
  };

  const handleStatusChange = () => {
    BOModal.confirm({
      title: (
        <span>
          Do you want to change status of <i>{task.title}</i>?
        </span>
      ),
      onOk() {
        const newTask: ITask = { ...task, isCompleted: !task.isCompleted };
        dispatch(changeTaskStatus(newTask));
      },
    });
  };

  return (
    <tr key={task.id}>
      <td style={{ textAlign: "center" }}>{task.id}</td>
      <td>{task.title}</td>
      <td style={{ textAlign: "center" }}>
        <>
          <Link to={`/user/${task.userId}`} target="_blank">
            <BOButton
              icon={<UserOutlined />}
              style={{ border: "transparent" }}
              title={`View user profile`}
            />
          </Link>

          <BOButton
            icon={<CopyOutlined />}
            style={{ border: "transparent" }}
            title={`Copy User Id: ${task.userId}`}
            onClick={handleCopyUserId}
          />
        </>
      </td>
      <td style={{ textAlign: "center" }}>
        {task.isCompleted ? (
          <BOTag style={{ background: "#85cc6e" }}>Completed</BOTag>
        ) : (
          <BOTag style={{ background: "#fb3f50" }}>Not Completed</BOTag>
        )}
      </td>
      <td style={{ textAlign: "center" }}>
        <BOButton
          icon={task.isCompleted ? <CheckSquareOutlined /> : <BorderOutlined />}
          style={{ border: "transparent" }}
          title={`${task.isCompleted ? "Incomplete" : "Complete"} task`}
          onClick={handleStatusChange}
        />
      </td>
    </tr>
  );
};
