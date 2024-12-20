import Header from "./components/Header";
import TaskManager from "./components/TaskManager";
import ShopManager from "./components/ShopManager";
import { useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ListAltIcon from "@mui/icons-material/ListAlt";

type activeComponent = "task" | "shop";

// Setup is temporary, as more managers are added the plan is to use react router but due to time and lack of knowledge, this is our setup for now :D
export default function App() {
  const [activeComponent, setActiveComponent] =
    useState<activeComponent>("task");
  const switchComponent = (component: activeComponent) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Header title="Posty" logoUrl="/posty_1.svg" />
      <div className="manager">
        <div className="switchButtons">
          <button
            onClick={() => switchComponent("task")}
            aria-pressed={activeComponent === "task"}
            className={activeComponent === "task" ? "active" : ""} // Conditionally add 'active' class
          >
            <ListAltIcon className="list-icon" />
            Task Manager
          </button>
          <button
            onClick={() => switchComponent("shop")}
            aria-pressed={activeComponent === "shop"}
            className={activeComponent === "shop" ? "active" : ""} // Conditionally add 'active' class
          >
            <ShoppingBasketIcon className="list-icon" />
            Shop Manager
          </button>
        </div>
      </div>
      {activeComponent === "task" ? <TaskManager /> : <ShopManager />}
    </>
  );
}
