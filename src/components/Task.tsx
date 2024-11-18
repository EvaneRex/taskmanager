/**
 * This is the task component, which represents each induvidual task that gets added. It displays the title and description and is creating the button to delete the task.
 *
 * @param {TaskProps} props - The props for the component
 * @param {number} id - The unique identifier for each task
 * @param {string} title - The title of the task
 * @param {ReactNode} children - The content that gets displayed inside the task (discription)
 * @param {(id: number)=>void} onDelete - A fuction for deletion, when the delete button is clicked.
 *
 * @returns {JSX.Element} - The rendered Task component.
 * 
 * What to add in the file?
 * <Task id={task.id} title={task.title} onDelete={handleDelete}>
    <p>{task.description}</p>
   </Task>
 *
 */
import { type ReactNode } from "react";

interface TaskProps {
  id: number;
  title: string;
  children: ReactNode;
  onDelete: (id: number) => void;
}

export default function Task({ id, title, children, onDelete }: TaskProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button
        onClick={() => onDelete(id)}
        aria-label="{`Delete task: ${title}`}"
      >
        Delete
      </button>
    </article>
  );



}
