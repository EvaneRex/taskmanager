/**
 * This is the NewTask component
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
        <label htmlFor="task">Your goal</label>
        <input type="text" id="task" ref={task} />
      </p>

      <p>
        <label htmlFor="summary">Short summary</label>
        <input type="text" id="summary" ref={summary} />
      </p>
      <p>
        <button>Add Task</button>
      </p>
    </form>
  );
}
