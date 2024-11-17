/**
 * This is the NewTask component. This enables users to add a new task by providing a title and a discription(summary).
 *
 * @param {NewTaskProps} props - The props for the component
 * @param {Function} onAddTask - The function that handles adding a new task.
 *
 * @returns {JSX.Element} - A fomr element containing inpput fields for the user to add a title and a summary
 *
 * What to put in the file?
 * <NewTask onAddTask={handleAddTask} />
 */
import { useRef, type FormEvent } from "react";

type NewTaskProps = {
  onAddTask: (task: string, summary: string) => void;
};

export default function NewTask({ onAddTask }: NewTaskProps) {
  const task = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTask = task.current!.value;
    const enteredSummary = summary.current!.value;

    event.currentTarget.reset();

    onAddTask(enteredTask, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="task">Add your task</label>
        <input type="text" id="task" ref={task} required />
      </p>

      <p>
        <label htmlFor="summary">Add your summary</label>
        <input type="text" id="summary" ref={summary} required />
      </p>
      <p>
        <button type="submit" aria-label="Add task">
          Add task
        </button>
      </p>
    </form>
  );
}
