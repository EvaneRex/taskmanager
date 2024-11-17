import Header from "./components/Header";
import TaskManager from "./components/TaskManager";
import ShopManager from "./components/ShopManager";

export default function App() {
  return (
    <>
      <Header title="Posty" logoUrl="/posty_1.svg" />
      <TaskManager />
      <ShopManager />
    </>
  );
}
