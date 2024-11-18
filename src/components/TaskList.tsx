/**
 * This is the TaskList component, its responsible for rendering the list itself. Every task is passed to the task component for display and users can delete the tasks using the onDeleteTask callback.
 *
 * @param {TaskListProps} props - The props for the tasklist component
 * @param {CTask[]} - An array for the task object to display. Each task contains an id, title and description.
 * @param {onDeleteTask} - a callback function, that deletes the task based on its id.
 *
 * @returns {JSX.Element} - A list of tasks rendered as on unordered list
 *
 * What to add in the file?
 *<TaskList tasks={tasks} onDeleteTask={(id) />
 */

import TaskItem from "./Task.tsx";

export type Priority = "High" | "Medium" | "Low";

//Define the order of priority
const priorityOrder: Record<Priority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;

//Define the type for tasklist (??)
export interface TaskItemType {
  id: number;
  title: string;
  summary: string;
  priority: Priority;
  completed: boolean;
}

/*type TaskListProps = {
  tasks: CTask[];
  onDeleteTask: (id: number) => void;
  toggleTaskListCompletion: (id: number) => void;
};*/


//define the props for the TaskList component
interface TaskListProps {
  taskItems: TaskItemType[];
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
}


const TaskList: React.FC<TaskListProps> = ({
  taskItems: taskItems,
  removeTaskItem,
  toggleTaskItemCompletion,
}) => {
  // Sort TaskList by priority and completed status
  const sortedTaskItem = [...taskItems].sort((a, b) => {
    // Sort by completed status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Completed tasks go last
    }

    // Sort by priority
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const groupedTasks = sortedTaskItem.reduce<
    Record<string, TaskItemType[]>
  >((acc, taskItem) => {
    if (!acc[taskItem.priority]) {
      acc[taskItem.priority] = [];
    }
    acc[taskItem.priority].push(taskItem);
    return acc;
  }, {});


  console.log(groupedTasks)

  return (
    <div aria-label="Task items">
      {Object.keys(groupedTasks).map((tasks) => (
        <section key={tasks} aria-labelledby={`task-${tasks}`}>
          <h2>{tasks}</h2>
          <ul>
            {groupedTasks[tasks].map((taskItem) => (
              <TaskItem
                key={taskItem.id}
                taskItem={taskItem}
                removeTaskItem={removeTaskItem}
                toggleTaskItemCompletion={toggleTaskItemCompletion}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default TaskList;

