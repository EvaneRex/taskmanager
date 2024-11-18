/**
 * This is the TaskList component, its responsible for rendering the list itself. Every task is passed to the task component for display and users can delete the tasks using the onDeleteTask callback.
 *
 * @param {TaskListProps} props - The props for the tasklist component
 * @param {CTask[]} - An array for the task object to display. Each task contains an id, title and description.
 * @param {onDeleteTask} - a callback function, that deletes the task based on its id.
 *
 * @returns {JSX.Element} - A list of tasks rendered as on unordered list
 *
 * What to add in the file?
 *<TaskList tasks={tasks} onDeleteTask={(id) />
 */

import Task from "./Task.tsx";
import { type Task as CTask } from "./TaskManager.tsx";


type Priority =
  | "High"
  | "Medium"
  | "Low";


//Define the order of priority
const priorityOrder: Record<Priority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;

//Define the type for tasklist (??)
interface TaskListType {
  id: number;
  title: string;
  summary: string;
  priority: Priority;
  completed: boolean;
}

//define the props for the TaskList component
type TaskListProps = {
  tasks: CTask[];
  onDeleteTask: (id: number) => void;
  toggleTaskListCompletion: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  toggleTaskListCompletion,
}) => {
  // Sort TaskList by priority and completed status
  const sortedTasks = [...tasks].
    sort((a, b) => {
      // Sort by completed status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Completed tasks go last
      }

      // Sort by priority
      return priorityOrder[a.priority]
        - priorityOrder[b.priority];
    });
}



export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  const handleDelete = (id: number) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDeletion) {
      onDeleteTask(id);
    }
  };

  return (
    <ul
      aria-label="Task list"
      aria-roledescription="A list for generating tasks based on your input"
    >
      {tasks.map((task) => (
        <li
          key={task.id}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Delete") {
              handleDelete(task.id);
            }
          }}
        >
          <Task id={task.id} title={task.title} onDelete={handleDelete}>
            <p>{task.description}</p>
          </Task>
        </li>
      ))}
    </ul>
  );
}
