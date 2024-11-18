/**
 * The Taskmanager component manages the tasks by allowing the users to add and delete tasks. It uses local storage to ensure the tasks are available after a page refresh.
 *
 * What to add to the file?
 * <Taskmanager />
 *
 * Note for future additions for the task files in general
 * Making it possible to mark as complete, adding a event keydown for space or enter to enable keyboard usage for marking as complete.
 */
import { useState } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

export type Task = {
  id: number;
  title: string;
  summary: string;
  completed: Boolean;
  priority: "High" | "Medium" | "Low";
};

export default function Taskmanager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = (
    task: string,
    summary: string,
    priority: "High" | "Medium" | "Low"
  ) => {
    const newTask: Task = {
      id: tasks.length + 1, // Generate a simple unique ID
      title: task,
      summary: summary,
      priority: priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = (id: number) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDeletion) {
      deleteTask(id);
    }
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
        <TaskList
          taskItem={tasks}
          removeTaskItem={deleteTask}
          toggleTaskItemCompletion={toggleTaskCompletion}
        />
      </section>
    </div>
  );
}
