/**
 * This is the NewTask component. This enables users to add a new task by providing a title and a discription(summary).
 *
 * @param {NewTaskProps} props - The props for the component
 * @param {Function} onAddTask - The function that handles adding a new task.
 *
 * @returns {JSX.Element} - A fomr element containing inpput fields for the user to add a title and a summary
 *
 */
import { FormEvent, useRef, useState } from "react";

type NewTaskProps = {
  onAddTask: (
    task: string,
    summary: string,
    priority: "High" | "Medium" | "Low"
  ) => void;
};

export default function NewTask({ onAddTask }: NewTaskProps) {
  const task = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTask = task.current!.value;
    const enteredSummary = summary.current!.value;

    event.currentTarget.reset();

    // Pass the task, summary, and selected priority to the parent
    onAddTask(enteredTask, enteredSummary, priority);
  }

  return (
    <form
      className="taskForm"
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
    >
      <h2 id="form-title">Add a new task</h2>
      <p>
        <label htmlFor="Task"></label>
        <input
          type="text"
          id="task"
          ref={task}
          placeholder="Add your task"
          aria-describedby="task-help"
          required
        />
        <small id="task-help" className="visually-hidden">
          Enter the task name or title.
        </small>
      </p>

      <p>
        <label htmlFor="Summary"></label>
        <input
          type="text"
          id="summary"
          ref={summary}
          placeholder="Add summary"
          aria-describedby="summary-help"
          required
        />
        <small id="summary-help" className="visually-hidden">
          Provide a brief description of the task
        </small>
      </p>

      <p>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </p>

      <p>
        <button type="submit" aria-label="Add task">
          Add task
        </button>
      </p>
    </form>
  );
}
