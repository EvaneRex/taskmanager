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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UndoIcon from "@mui/icons-material/Undo";

//Define interface for ShopItem
interface ShopItemProps {
  shopItem: {
    id: number;
    name: string;
    completed: boolean;
    department:
      | "Fruit/Vegetables"
      | "Bread"
      | "Dry goods"
      | "Dairy"
      | "Meat"
      | "Frozen"
      | "Non Food";
    shop: string;
  };
  removeShopItem: (id: number) => void; // function to remove a shop item by id
  toggleShopItemCompletion: (id: number) => void; // function to toggle completion status of a shop item based on id
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
    toggleShopItemCompletion(id);
  };

  //Function that handle deleting a task with a confirmation msg
  const handleDeleteClick = (id: number): void => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      removeShopItem(id);
    }
  };

  //JSX for rendering the shop item
  return (
    <li className={`shop-item ${shopItem.completed ? "completed" : ""}`}>
      <div>
        <p className={`priority-${shopItem.department}`}>
          {shopItem.name} - {shopItem.department}
        </p>{" "}
        {/*Task name without colourchange*/}
      </div>
      <div className="shop-buttons">
        <button
          onClick={() => handleCompleteClick(shopItem.id)}
          className={`complete ${shopItem.completed ? "active" : ""}`}
        >
          {shopItem.completed ? (
            <>
              <UndoIcon />
            </>
          ) : (
            <>
              <CheckCircleOutlineIcon />
            </>
          )}
        </button>
        <button onClick={() => handleDeleteClick(shopItem.id)}>
          <RemoveCircleOutlineIcon />
        </button>
      </div>
    </li>
  );
};

export default ShopItem;
