import { useAppDispatch } from "../../../../../../app/hooks";
import { BOButton, BOTag, Modal } from "../../../../../../shared/components";
import { ITask } from "../../../../../../types/tasks";
import { changeTaskStatus } from "../../tasksGridSlice";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";

interface Props {
  task: ITask;
}
export const TaskGridRow = (props: Props) => {
  const { task } = props;
  const dispatch = useAppDispatch();

  const handleStatusChange = () => {
    Modal.confirm({
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
      <td>{task.userId}</td>
      <td>
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
