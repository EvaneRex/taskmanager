/**
 * This is the task component, which represents each induvidual task that gets added. It displays the title and description and is creating the button to delete the task.
 *
 * @param {TaskProps} props - The props for the component, it has been imported from the TaskList file. 
 * @param {removeTaskItem} - A fuction for deletion, when the delete button is clicked.
 *
 * @returns {JSX.Element} - The rendered Task component.
 
 *
 */

import { TaskItemType } from "./TaskList";

interface TaskProps {
  taskItem: TaskItemType
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
}

export type Tasks = string;

const Task: React.FC<TaskProps> = ({
  taskItem,
  removeTaskItem,
  toggleTaskItemCompletion,
}) => {
  const handleCompleteClick = (id: number): void => {
    toggleTaskItemCompletion(id);
  };

  const handleDeleteClick = (id: number): void => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      removeTaskItem(id);
    }
  };

  return (
    <li className={`task-item ${taskItem.completed ? "completed" : ""}`}>
      <span>{taskItem.title}</span> {/*Task name without colourchange*/}
      <span className={`priority-${taskItem.priority}`}>
        {" "}
        - Priority: {taskItem.priority}
      </span>
      <button
        onClick={() => handleCompleteClick(taskItem.id)}
        className={`complete ${taskItem.completed ? "active" : ""}`}
      >
        {taskItem.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDeleteClick(taskItem.id)} className="delete">
        Delete
      </button>
    </li>
  );
};

export default Task;
