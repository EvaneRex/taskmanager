/**
 * This is the task component.
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
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}
