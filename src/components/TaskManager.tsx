/**
 * The Taskmanager component manages the tasks by allowing the users to add, delete, edit and mark them as complete. It uses localstorage to ensure the tasks stays even after page refresh.
 *
 *
 * Note for future additions for the task files in general
 * Adding a event keydown for space or enter to enable keyboard usage for marking as complete.
 * 
 */

import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TaskList, { Priority, TaskItemType } from "./TaskList";

export default function Taskmanager() {
  // Retrieves any stored tasks from storage and parses them into an Array. If there is none, its returns an empty array.
  const storedTasks: TaskItemType[] = JSON.parse(
    localStorage.getItem("taskItems") || "[]"
  );

  // Updates storage whenever a tasks state changes, which helps them stay even after a page refresh.
  const [tasks, setTasks] = useState<TaskItemType[]>(storedTasks);

  useEffect(() => {
    localStorage.setItem("taskItems", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the tasklist with the title, summary and priority given by users.
  const addTask = (task: string, summary: string, priority: Priority) => {
    const newTask: TaskItemType = {
      id: tasks.length + 1, // Generate a simple ID based on the current length of tasks.
      title: task,
      summary: summary,
      priority: priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // Apends the new task to the list
  };

  // Handles the complete marking af tasks
  const handleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task - main code/confirmation is in the task component
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Updates the task after editing
  const updateTask = (updatedTask: TaskItemType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  return (
    <div className="manager">
      <div className="taskmanager">
        <h1>Task Manager</h1>

        <NewTask onAddTask={addTask} />

        <section aria-labelledby="task-list">
          {tasks.length === 0 ? (
            <p className="alertMsg" role="alert" aria-live="polite">
              No tasks yet. Start adding some!
            </p>
          ) : (
            <TaskList
              taskItems={tasks as TaskItemType[]}
              removeTaskItem={deleteTask}
              toggleTaskItemCompletion={handleComplete}
              onUpdateTask={updateTask}
            />
          )}
        </section>
      </div>
    </div>
  );
}
