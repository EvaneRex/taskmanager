/**
 * Component that handles the display and interaction for each individual task.
 * It is responsible for showing task details such as name, item, priority and status, as well as managing user interactions like marking the task as completed.
 * 
 * @param {ShopItemProps} - The props for the shopItem component
 * @param {Shop} - Defines the type for shops
 * @param {shopItem} -  contains an items name, department and id. 
 * @param {removeShopItem} -   function that handle deleting a task

 * @param {toggleShopItemCompletion} -  function that handle marking a task as complete

 * 
 * @returns JSX element for rendering the shop item
 * 
 */

//Define interface for ShopItem
interface ShopItemProps {
  shopItem: {
    id: number;
    name: string;
    completed: boolean;
    department:
      | "Fruit/Vegetables"
      | "Bread"
      | "Meat"
      | "Dairy"
      | "Frozen"
      | "Non Food";
    shop: string;
  };
  removeShopItem: (id: number) => void;
  toggleShopItemCompletion: (id: number) => void;
}
//Define the type for shops (will be just a string in this instance)
export type Shop = string;

const ShopItem: React.FC<ShopItemProps> = ({
  shopItem,
  removeShopItem,
  toggleShopItemCompletion,
}) => {
  //Function that handle marking a task as complete
  const handleCompleteClick = (id: number): void => {
    if (!shopItem.completed) {
      toggleShopItemCompletion(id);
    }
  };

  //Function that handle deleting a task
  const handleDeleteClick = (id: number): void => {
    const confirmed = window.confirm(
      "Er du sikker på, at du ønsker at slette?"
    );
    if (confirmed) {
      removeShopItem(id);
    }
  };

  //JSX for rendering the shop item
  return (
    <li className={`shop-item ${shopItem.completed ? "completed" : ""}`}>
      <span>{shopItem.name}</span> {/*Task name without colourchange*/}
      <span className={`priority-${shopItem.department}`}>
        {" "}
        - Department: {shopItem.department}
      </span>
      <button
        onClick={() => handleCompleteClick(shopItem.id)}
        className={`complete ${shopItem.completed ? "active" : ""}`}
      >
        {shopItem.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDeleteClick(shopItem.id)} className="delete">
        Delete
      </button>
    </li>
  );
};

export default ShopItem;
