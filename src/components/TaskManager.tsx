/**
 * The Taskmanager component manages the tasks by allowing the users to add and delete tasks. It uses local storage to ensure the tasks are available after a page refresh.
 *
 * What to add to the file?
 * <Taskmanager />
 *
 * Note for future additions for the task files in general
 * Making it possible to mark as complete, adding a event keydown for space or enter to enable keyboard usage for marking as complete.
 */
import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TaskList, { Priority, TaskItemType } from "./TaskList";



export default function Taskmanager() {
  const storedTasks: TaskItemType[] = JSON.parse(localStorage.getItem("taskItems") || "[]");
  const [tasks, setTasks] = useState<TaskItemType[]>(storedTasks);

  useEffect(() => {
    localStorage.setItem("taskItems", JSON.stringify(tasks));
  }, [tasks])

  // Add a new task
  const addTask = (
    task: string,
    summary: string,
    priority: Priority
  ) => {
    const newTask: TaskItemType = {
      id: tasks.length + 1, // Generate a simple unique ID
      title: task,
      summary: summary,
      priority: priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleComplete = (id: number) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

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
      <TaskList taskItems={tasks as TaskItemType[]} removeTaskItem={handleDelete} toggleTaskItemCompletion={handleComplete} />
    </div>
  );
}
