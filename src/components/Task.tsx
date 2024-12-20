/**
 * This is the task component, which represents each induvidual task that gets added. It displays the title, summary and priority. It also controls the marking of completion or deletion, and has an editing modal to update the tasks. 
 *
 * @param {TaskProps} props - The props for the component, it has been imported from the TaskList file. 
 * @param {TaskItemType} props.taskItem - This contains the task details
 * @param {removeTaskItem} - A fuction for deletion, when the delete button is clicked.
 * @param {toggleTaskItemCompletion} - A function for toggeling a tasks completion status
 * @param {updatedTask} - A function that updates the task after editing
 *
 * @returns {JSX.Element} - The rendered Task component.
 
 *
 */

import { TaskItemType } from "./TaskList";
import { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UndoIcon from "@mui/icons-material/Undo";
import EditIcon from "@mui/icons-material/Edit";


interface TaskProps {
  taskItem: TaskItemType; //imported from TaskList.tsx 
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
  //functions that makes it possible for them to interact and update the task list
  const [isEditing, setIsEditing] = useState(false); // Modal visibility state
  const [title, setTitle] = useState(taskItem.title);
  const [summary, setSummary] = useState(taskItem.summary);
  const [priority, setPriority] = useState(taskItem.priority);

  //function that give the task the status of complete or not-complete
  const handleCompleteClick = (id: number): void => {
    toggleTaskItemCompletion(id);
  };
  //function that make it possible to delete an task.
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
      <div>
        <h2>{taskItem.title}</h2> {/*Task name without colourchange*/}
        <p>{taskItem.summary}</p>
      </div>
      {/* Buttons */}
      <div className="task-buttons">
        <button
          onClick={() => handleCompleteClick(taskItem.id)}
          className={`complete ${taskItem.completed ? "active" : ""}`}
        >{/*btn that handles the task status*/}
          {taskItem.completed ? (
            <>
              <UndoIcon className="icon" />
            </>
          ) : (
            <>
              <CheckCircleOutlineIcon className="icon" />
            </>
          )}
        </button>
        <button onClick={() => setIsEditing(true)}>{/*btn that handles the editing*/}
          <EditIcon />
        </button>
        <button
          onClick={() => handleDeleteClick(taskItem.id)}
          className="delete"
        >{/*btn that handles the delete option*/}
          <RemoveCircleOutlineIcon className="icon" />
        </button>
      </div>
      {/* Modal for Editing */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 id="edit-task-title">Edit Task</h2>
            <label htmlFor="editTitle">
              Title:
              <input
                id="editTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Task title"
              />
            </label>
            <label htmlFor="editSummary">
              Summary:
              <textarea
                id="editSummary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                aria-label="Task summary"
                className="custom-edit"
              />
            </label>
            <label htmlFor="editPriority">
              Priority:
              <select
                id="editPriority"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "High" | "Medium" | "Low")
                }
                aria-label="Task priority"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <button onClick={handleSaveClick} aria-label="Save task changes">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Task;
