/**
 * This is the ShopManager component, which connects ShopInput, ShopItem and ShopList into one. This is what creates a functional application for users to add and remove items and shops to/from the list.
 *
 * @returns {JSX.Element} - the rendered component
 */
import ShopInput from "./ShopInput";
import ShopItem from "./ShopItem";
import ShopList from "./ShopList";
import { useEffect, useState } from "react";

// props
interface ShopItem {
  id: number;
  name: string;
  completed: boolean;
  shop: string;
  department:
    | "Fruit/Vegetables"
    | "Bread"
    | "Dry goods"
    | "Dairy"
    | "Meat"
    | "Frozen"
    | "Non Food";
}

//This is the component itself
function ShopManager() {
  // Retrieves shop item data from the localstorage, or initializes an empty array if there is nothing there. It parses the JSON string into the ShopItem[] object.
  const storedShopItems: ShopItem[] = JSON.parse(
    localStorage.getItem("shopItems") || "[]"
  );

  // Retrieves shop name data from localstorage, or initilializes an empty array of there is nothing. Parses JSON string into a String[] object
  const storedShops: string[] = JSON.parse(
    localStorage.getItem("shops") || "[]"
  );

  // Creates a state variable for shop items
  const [shopItems, setShopItems] = useState<ShopItem[]>(storedShopItems);

  // Creates a state variable for shops
  const [shops, setShops] = useState<string[]>(storedShops);

  // Effect hook to synchronize shopItems state with localstorage. When the shopItems change, it updates the shopItems keu in localstorage
  useEffect(() => {
    localStorage.setItem("shopItems", JSON.stringify(shopItems));
  }, [shopItems]);

  // Effect hook that synchronize shop state with local storage, again when they change they update the shops key in localstorage
  useEffect(() => {
    localStorage.setItem("shops", JSON.stringify(shops));
  }, [shops]);

  // Function to add a new shop item with parameters
  const addShopItem = (
    itemName: string,
    itemDepartment:
      | "Fruit/Vegetables"
      | "Bread"
      | "Dry goods"
      | "Dairy"
      | "Meat"
      | "Frozen"
      | "Non Food",
    itemShop: string
  ) => {
    // Create a new shopitem object with properties
    const newShopItem: ShopItem = {
      id: Date.now(),
      name: itemName,
      completed: false,
      shop: itemShop || "General", // Fallback to "General" if no shop is specified
      department: itemDepartment,
    };
    // Updates he shopItems state
    setShopItems([...shopItems, newShopItem]);
  };

  // Function - adds a new shop to the shops array
  const addShop = (shopName: string) => {
    if (!shops.includes(shopName)) {
      // Checks if shopName already exists in the shops array
      setShops([...shops, shopName]); // Adds the shop to the shops array
    }
  };

  // Function - removes a shop item by its id
  const removeShopItem = (id: number) => {
    setShopItems(shopItems.filter((shopItem) => shopItem.id !== id));
  };

  // Function to remove ALL shopitems og shops, clears both the state and localstorage.
  const removeAllShopItems = () => {
    const confirmed = window.confirm(
      //Confirmation message to ensure users didnt misclick
      "Are you sure you want to delete all items and shops?"
    );
    if (confirmed) {
      setShopItems([]); // Clears all items
      setShops([]); // Clears all shops
      localStorage.removeItem("shopItems"); // Removes data from localStorage
      localStorage.removeItem("shops"); // Removes shops from localStorage
    }
  };

  // Function - toggle completion status of a shop item
  const toggleShopItemCompletion = (id: number) => {
    setShopItems(
      shopItems.map(
        (
          shopItem // updates shop state by mapping over the array
        ) =>
          shopItem.id === id // matches the id and toggles it
            ? { ...shopItem, completed: !shopItem.completed } // creates a new object with the toggled complete status
            : shopItem // if the ids dont match, returns it as is
      )
    );
  };
  return (
    <div className="manager">
      <div className="shopmanager">
        <h1>Grocery List</h1>
        <section className="shopForm" aria-labelledby="add-items">
          <h2 id="add-items">Add shop to list</h2>
          <ShopInput
            addShopItem={addShopItem}
            addShop={addShop}
            shops={shops}
          />
        </section>
        <section aria-labelledby="shopping-list">
          {shopItems.length === 0 ? (
            <p className="alertMsg" role="alert" aria-live="polite">
              No items in your shopping list. Start adding some!
            </p>
          ) : (
            <ShopList
              shopItems={shopItems}
              removeShopItem={removeShopItem}
              toggleShopItemCompletion={toggleShopItemCompletion}
              aria-label="List of shopping items"
            />
          )}
        </section>
        <button
          onClick={removeAllShopItems}
          className="delete-all"
          aria-label="Delete all items and shops"
        >
          Delete All Items and Shops
        </button>
      </div>
    </div>
  );
}

export default ShopManager;
