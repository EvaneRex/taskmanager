import Header from "./components/Header";
import TaskManager from "./components/TaskManager";
import ShopManager from "./components/ShopManager";
import { useState } from "react";

type activeComponent = "task" | "shop";

//Skal måske fjernes!!
export default function App() {
  const [activeComponent, setActiveComponent] =
    useState<activeComponent>("task");
  const switchComponent = (component: activeComponent) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Header title="Posty" logoUrl="/posty_1.svg" />
      <div>
        <button
          onClick={() => switchComponent("task")}
          aria-pressed={activeComponent === "task"}
        >
          Task Manager
        </button>
        <button
          onClick={() => switchComponent("shop")}
          aria-pressed={activeComponent === "shop"}
        >
          Shop Manager
        </button>
      </div>
      {activeComponent === "task" ? <TaskManager /> : <ShopManager />}
    </>
  );
}
