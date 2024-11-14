/**
 * This is the TaskList component
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
