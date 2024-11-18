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
  tasks: {
    id: number;
    title: string;
    summary: string;
    completed: boolean;
    priority:
    | "High"
    | "Medium"
    | "Low";
    taskItem: string;

  };
  onDelete: (id: number) => void;
  toggleTaskListCompletion: (id: number) => void;
}


export type Task = string;

const TaskList: React.FC<TaskProps> = ({
  taskList,
  onDelete,
  toggleTaskListCompletion,
}) => {
  const handleCompleteClick = (id: number): void => {
    toggleTaskListCompletion(id);
  };

  const handleDeleteClick = (id: number): void => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      onDelete(id);
    }
  };


  return (
    <li className={`task-list ${taskList.completed ? "completed" : ""}`}>
      <span>{taskList.title}</span> {/*Task name without colourchange*/}
      <span className={`priority-${taskList.priority}`}>
        {" "}
        - Priority: {taskList.priority}
      </span>
      <button
        onClick={() => handleCompleteClick(taskList.id)}
        className={`complete ${taskList.completed ? "active" : ""}`}
      >
        {taskList.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDeleteClick(taskList.id)} className="delete">
        Delete
      </button>
    </li>
  );
};

export default TaskList;

