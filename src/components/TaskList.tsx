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

type TaskListProps = {
  tasks: CTask[];
  onDeleteTask: (id: number) => void;
};

export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task id={task.id} title={task.title} onDelete={onDeleteTask}>
            <p>{task.description}</p>
          </Task>
        </li>
      ))}
    </ul>
  );
}
