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

import { TaskItemType } from "./TaskList";
import { useState } from "react";

interface TaskProps {
  taskItem: TaskItemType;
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
  onUpdateTask: (updatedTask: TaskItemType) => void;
}

export type Tasks = string;

const Task: React.FC<TaskProps> = ({
  taskItem,
  removeTaskItem,
  toggleTaskItemCompletion,
  onUpdateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false); // Modal visibility state
  const [title, setTitle] = useState(taskItem.title);
  const [summary, setSummary] = useState(taskItem.summary);
  const [priority, setPriority] = useState(taskItem.priority);

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

  // Handles the editing changes and updates the tasks
  const handleSaveClick = () => {
    const updatedTask = {
      ...taskItem,
      title,
      summary,
      priority,
    };
    onUpdateTask(updatedTask);
    setIsEditing(false); // Closes the modal
  };

  return (
    <li className={`task-item ${taskItem.completed ? "completed" : ""}`}>
      <span>{taskItem.title}</span> {/*Task name without colourchange*/}
      <span className={`priority-${taskItem.priority}`}>
        {" "}
        - Priority: {taskItem.priority}
      </span>
      {/* Buttons */}
      <button
        onClick={() => handleCompleteClick(taskItem.id)}
        className={`complete ${taskItem.completed ? "active" : ""}`}
      >
        {taskItem.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => handleDeleteClick(taskItem.id)} className="delete">
        Delete
      </button>
      {/* Modal for Editing */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Task</h2>
            <label>
              Title:
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              Summary:
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </label>
            <label>
              Priority:
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "High" | "Medium" | "Low")
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Task;
