/**
 * This is the task component, which represents each induvidual task that gets added. It displays the title and description and is creating the button to delete the task.
 *
 * @param {TaskProps} props - The props for the component
 * @param {number} id - The unique identifier for each task
 * @param {string} title - The title of the task
 * @param {ReactNode} children - The content that gets displayed inside the task (discription)
 * @param {(id: number)=>void} onDelete - A fuction for deletion, when the delete button is clicked.
 *
 * @returns {JSX.Element} - The rendered Task component.
 * 
 * What to add in the file?
 * <Task id={task.id} title={task.title} onDelete={handleDelete}>
    <p>{task.description}</p>
   </Task>
 *
 */


interface TaskProps {
  taskItem: {
    id: number;
    title: string;
    summary: string;
    completed: boolean;
    priority:
    | "High"
    | "Medium"
    | "Low";
    tasks: string;

  };
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
}


export type Tasks = string;

const TaskList: React.FC<TaskProps> = ({
  taskItem,
  removeTaskItem,
  toggleTaskItemCompletion,
}) => {
  const handleCompleteClick = (id: number): void => {
    toggleTaskItemCompletion(id);
  };

  const handleDeleteClick = (id: number): void => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
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

export default TaskList;

