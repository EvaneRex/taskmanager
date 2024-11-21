/**
 * This is ShopList, which displays the shopping items grouped by shop and sorted by departments. Its also responsible for enabeling the marking of completed or remove buttons.
 *
 * @param {ShopItemType[]} - Array of things that define the shopItem.
 * @param {(id:number) => void} props.removeShopItem - A function to remove shop items based on id
 * @param {(id:number) => void} props.toggleShopItemCompletion - A function to toggle the status of an item
 * @param {ShopListProps} - props for the shopList component.
 * @returns {JSX.Element} - A rendered shoplist component
 *
 */

import ShopItem from "./ShopItem";

type Department =
  | "Fruit/Vegetables"
  | "Bread"
  | "Dry goods"
  | "Dairy"
  | "Meat"
  | "Frozen"
  | "Non Food";

// Define the order of departments
const departmentOrder: Record<Department, number> = {
  "Fruit/Vegetables": 1,
  Bread: 2,
  "Dry goods": 3,
  Dairy: 4,
  Meat: 5,
  Frozen: 6,
  "Non Food": 7,
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
    <div aria-label="Shopping items">
      {Object.keys(groupedShopItems).map((shop) => (
        <section
          className="shopBox"
          key={shop}
          aria-labelledby={`shop-${shop}`}
        >
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
        </section>
      ))}
    </div>
  );
};

export default ShopList;
