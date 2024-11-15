/**
 * This is the ShopManager component, which connects ShopInput, ShopItem and ShopList into one. This is what creates a functional application for users to add and remove items and shops to/from the list.
 *
 *@param {}
 *
 */
import ShopInput from "./ShopInput";
import ShopItem from "./ShopItem";
import ShopList from "./ShopList";
import { useEffect, useState } from "react";

interface ShopItem {
  id: number;
  name: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  shop: string;
}

function ShopManager() {
  const storedShopItems: ShopItem[] = JSON.parse(
    localStorage.getItem("shopItems") || "[]"
  );
  const storedShops: string[] = JSON.parse(
    localStorage.getItem("shops") || "[]"
  );

  const [shopItems, setShopItems] = useState<ShopItem[]>(storedShopItems);
  const [shops, setShops] = useState<string[]>(storedShops);

  useEffect(() => {
    localStorage.setItem("shopItems", JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem("shops", JSON.stringify(shops));
  }, [shops]);

  const addShopItem = (
    itemName: string,
    itemPriority: "low" | "medium" | "high",
    itemShop: string
  ) => {
    const newShopItem: ShopItem = {
      id: Date.now(),
      name: itemName,
      completed: false,
      priority: itemPriority || "low",
      shop: itemShop || "General", // Fallback to "General" if no shop is specified
    };
    setShopItems([...shopItems, newShopItem]);
  };

  const addShop = (shopName: string) => {
    if (!shops.includes(shopName)) {
      setShops([...shops, shopName]); // Adds the shop to the shops array
    }
  };

  const removeShopItem = (id: number) => {
    setShopItems(shopItems.filter((shopItem) => shopItem.id !== id));
  };

  const removeAllShopItems = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items and shops?"
    );
    if (confirmed) {
      setShopItems([]); // Clears all items
      setShops([]); // Clears all shops
      localStorage.removeItem("shopItems"); // Removes data from localStorage
      localStorage.removeItem("shops"); // Removes shops from localStorage
    }
  };

  const toggleShopItemCompletion = (id: number) => {
    setShopItems(
      shopItems.map((shopItem) =>
        shopItem.id === id
          ? { ...shopItem, completed: !shopItem.completed }
          : shopItem
      )
    );
  };
  return (
    <div className="app">
      <h1>Shop Manager</h1>
      <ShopInput addShopItem={addShopItem} addShop={addShop} shops={shops} />
      <ShopList
        shopItems={shopItems}
        removeShopItem={removeShopItem}
        toggleShopItemCompletion={toggleShopItemCompletion}
      />
      <button onClick={removeAllShopItems} className="delete-all">
        Delete All Items and Shops
      </button>
    </div>
  );
}

export default ShopManager;
