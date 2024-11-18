/**
 * The Taskmanager component manages the tasks by allowing the users to add and delete tasks. It uses local storage to ensure the tasks are available after a page refresh.
 *
 * What to add to the file?
 * <Taskmanager />
 *
 * Note for future additions for the task files in general
 * Making it possible to mark as complete, adding a event keydown for space or enter to enable keyboard usage for marking as complete.
 */
import TaskList from "./TaskList.tsx";
import { useState } from "react";
import NewTask from "./NewTask";

interface Task {
  id: number;
  title: string;
  summary: string;
  completed: Boolean;
  priority: "High" | "Medium" | "Low";
}

export default function Taskmanager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = (task: string, summary: string, priority: string) => {
    const newTask: Task = {
      id: tasks.length + 1, // Generate a simple unique ID
      title: task,
      summary: summary,
      priority: priority,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <NewTask onAddTask={addTask} />

      <section>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h2>
                  {task.title} ({task.priority})
                </h2>
                <p>{task.summary}</p>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks yet. Add a task above!</p>
        )}
      </section>
    </div>
  );
}
