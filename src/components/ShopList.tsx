/**
 * This is the component ShopList that is responsible for showing all of the information. Not to be confused with the ShopManger, that connects all of them to the app.
 */

import ShopItem from "./ShopItem";

type Department =
  | "Fruit/Vegetables"
  | "Bread"
  | "Meat"
  | "Dairy"
  | "Frozen"
  | "Non Food";

// Define the order of departments
const departmentOrder: Record<Department, number> = {
  "Fruit/Vegetables": 1,
  Bread: 2,
  Meat: 3,
  Dairy: 4,
  Frozen: 5,
  "Non Food": 6,
} as const;

// Define the type for a shop item
interface ShopItemType {
  id: number;
  name: string;
  shop: string;
  department: Department;
  completed: boolean;
}

// Define the props for the ShopList component
interface ShopListProps {
  shopItems: ShopItemType[];
  removeShopItem: (id: number) => void;
  toggleShopItemCompletion: (id: number) => void;
}

const ShopList: React.FC<ShopListProps> = ({
  shopItems,
  removeShopItem,
  toggleShopItemCompletion,
}) => {
  // Sort shopItems by department and completed status
  const sortedShopItems = [...shopItems].sort((a, b) => {
    // Sort by completed status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Completed items go last
    }

    // Sort by department
    return departmentOrder[a.department] - departmentOrder[b.department];
  });

  // Group shopItems by shop
  const groupedShopItems = sortedShopItems.reduce<
    Record<string, ShopItemType[]>
  >((acc, shopItem) => {
    if (!acc[shopItem.shop]) {
      acc[shopItem.shop] = [];
    }
    acc[shopItem.shop].push(shopItem);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedShopItems).map((shop) => (
        <div key={shop}>
          <h2>{shop}</h2>
          <ul>
            {groupedShopItems[shop].map((shopItem) => (
              <ShopItem
                key={shopItem.id}
                shopItem={shopItem}
                removeShopItem={removeShopItem}
                toggleShopItemCompletion={toggleShopItemCompletion}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShopList;
