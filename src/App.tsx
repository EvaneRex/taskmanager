import Header from "./components/Header";
import TaskManager from "./components/TaskManager";

export default function App() {
  return (
    <>
      <Header title="Taskmanager" logoUrl="/posty_1.svg" />
      <TaskManager />
    </>
  );
}
