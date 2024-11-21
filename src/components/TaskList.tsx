/**
 * This is the TaskList component, its responsible for rendering the list itself. Every task is passed to the task component for display and users can delete the tasks using the onDeleteTask callback. Its also responsible for the sorting by priority.
 *
 * @param {Priority} type - Adds the needed values for the priority i place of a string value, which is invalid
 * @param {Priority} order - Gives each level af value, which is used to group and place the task based on priority
 *  @param {TaskItemType} - An array for the task object to display. Each task contains an id, title and description.
 *  @param {TaskListProps} props - The props for the tasklist component
 *  @param {removeTaskItem} - A callback function that deletes the task based on its id.
 * @param {toggleShopItemCompletion} - A function to toggle the status of an item between complete and active.
 * @param {onUpdateTask} - A function that updates the task after an editing by the user
 * 
 * 
 * @returns {JSX.Element} - A list of tasks rendered as on unordered list
 *
 */

import TaskItem from "./Task.tsx";
export type Priority = "High" | "Medium" | "Low";

//Define the order of priority
const priorityOrder: Record<Priority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;

//Define the type for taskItem
export interface TaskItemType {
  id: number;
  title: string;
  summary: string;
  priority: Priority;
  completed: boolean;
}

//define the props for the TaskList component
interface TaskListProps {
  taskItems: TaskItemType[];
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
  onUpdateTask: (updatedTask: TaskItemType) => void;
}

//function for TaskList contains taskItem from  above and remove and toggle.
const TaskList: React.FC<TaskListProps> = ({
  taskItems: taskItems,
  removeTaskItem,
  toggleTaskItemCompletion,
  onUpdateTask,
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

  // Groups the tasks based on priority
  const groupedTasks = sortedTaskItem.reduce<Record<string, TaskItemType[]>>(
    (acc, taskItem) => {
      if (!acc[taskItem.priority]) {
        acc[taskItem.priority] = [];
      }
      acc[taskItem.priority].push(taskItem);
      return acc;
    },
    {}
  );

  console.log(groupedTasks);

  return (
    <div aria-label="Task items">
      {Object.keys(groupedTasks).map((tasks) => (
        <section
          className="taskBox"
          key={tasks}
          aria-labelledby={`task-${tasks}`}
        >
          <h2 className="priority">{tasks}</h2> {/* Shows the priority! */}
          <ul>
            {groupedTasks[tasks].map((taskItem) => (
              <TaskItem
                key={taskItem.id}
                taskItem={taskItem}
                removeTaskItem={removeTaskItem}
                toggleTaskItemCompletion={toggleTaskItemCompletion}
                onUpdateTask={onUpdateTask}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default TaskList;
