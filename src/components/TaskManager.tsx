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
import { useEffect, useState } from "react";
import NewTask from "./NewTask.tsx";

export type Task = {
  title: string;
  description: string;
  id: number;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Loads tasks from the local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Stores the tasks from local storage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // handler for adding tasks
  function handleAddTask(task: string, summary: string) {
    setTasks((prevTasks) => {
      const newTask: Task = {
        id: Math.random(),
        title: task,
        description: summary,
      };
      return [...prevTasks, newTask];
    });
  }

  //handles deletion for tasks based on id
  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <main>
      <h1 className="TM-h1">Taskmanager</h1>
      <NewTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </main>
  );
}
