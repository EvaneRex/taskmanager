/**
 * This is the component for the input in shoplist, it allows users to add items and stores to the list. There is two forms, one for adding a new shop and one for the items, which has the added functionality for priority and shop.
 *
 * @param {ShopInputProps} props - the props for the ShopInput component
 * @param {addShopItem} - contains a function thats adds a new item to a specific shop and priority
 * @param {addShop} - contains a function that adds a new shop to the list of shops
 * @param {shops} - stores the exixting shop names in an array
 *
 * @returns {JSX.Element} - a form interface with 2 sections, one for adding the shops and one for items with specific priority and shop
 *
 * What to add in the file?
 * <ShopInput addShopItem={addShopItem} addShop={addShop} shops={shops} />
 *
 */

import { FC, useState } from "react";

interface ShopInputProps {
  addShopItem: (
    item: string,
    priority: "low" | "medium" | "high",
    shop: string,
    department:
      | "Fruit/Vegetables"
      | "Bread"
      | "Meat"
      | "Dairy"
      | "Frozen"
      | "Non Food"
  ) => void;
  addShop: (shop: string) => void;
  shops: string[];
}

const ShopInput: FC<ShopInputProps> = ({ addShopItem, addShop, shops }) => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "null">(
    "null"
  );
  const [shopName, setShopName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [department, setDepartment] = useState<
    | "Fruit/Vegetables"
    | "Bread"
    | "Meat"
    | "Dairy"
    | "Frozen"
    | "Non Food"
    | "null"
  >("null");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputValue.trim() &&
      priority &&
      selectedShop &&
      department !== "null"
    ) {
      addShopItem(
        inputValue,
        priority as "low" | "medium" | "high",
        selectedShop,
        department
      );
      setInputValue("");
      setPriority("null");
      setSelectedShop("");
      setDepartment("null");
    }
  };

  const handleShopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shopName.trim()) {
      addShop(shopName);
      setShopName("");
    }
  };

  return (
    <>
      {/* Handles the submit for the shops */}
      <form onSubmit={handleShopSubmit}>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Tilføj butik"
        />
        <button type="submit">Tilføj butikken</button>
      </form>

      {/* Handles on submit for the items */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tilføj ny vare"
        />

        {/* Priority selection */}
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          required
        >
          <option value="" disabled hidden>
            Vælg afdeling
          </option>
          <option value="frugt/grønt">Frugt & Grønt</option>
          <option value="brød">Brød</option>
          <option value="kød">Kød</option>
          <option value="nonfood">NonFood</option>
          <option value="mejeri">Mejeri</option>
          <option value="frost">Frost</option>
        </select>

        {/* Shop selection */}
        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Vælg butik
          </option>
          {shops.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </select>

        <button type="submit">Tilføj</button>
      </form>
    </>
  );
};

export default ShopInput;
