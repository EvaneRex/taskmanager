/**
 *
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

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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

  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <main>
      <NewTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </main>
  );
}
