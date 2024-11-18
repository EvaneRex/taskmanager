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
    department:
      | "Fruit/Vegetables"
      | "Bread"
      | "Meat"
      | "Dairy"
      | "Frozen"
      | "Non Food",
    shop: string
  ) => void;
  addShop: (shop: string) => void;
  shops: string[];
}

const ShopInput: FC<ShopInputProps> = ({ addShopItem, addShop, shops }) => {
  const [inputValue, setInputValue] = useState("");
  const [shopName, setShopName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    | "Fruit/Vegetables"
    | "Bread"
    | "Meat"
    | "Dairy"
    | "Dry goods"
    | "Frozen"
    | "Non Food"
    | " "
  >(" ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && selectedShop && selectedDepartment !== " ") {
      addShopItem(inputValue, selectedDepartment, selectedShop);
      setInputValue("");
      setSelectedShop("");
      setSelectedDepartment(" ");
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
          placeholder="Add shopname"
        />
        <button type="submit">Add shop</button>
      </form>

      {/* Handles on submit for the items */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new item"
        />

        {/* Department selection */}
        <select
          value={selectedDepartment}
          onChange={(e) =>
            setSelectedDepartment(
              e.target.value as
              | "Fruit/Vegetables"
              | "Bread"
              | "Meat"
              | "Dairy"
              | "Frozen"
              | "Non Food"
              | " "
            )
          }
          required
        >
          <option value=" " disabled hidden>
            Choose department
          </option>
          <option value="Fruit/Vegetables">Fruit & Vegetables</option>
          <option value="Bread">Bread</option>
          <option value="Meat">Meat</option>
          <option value="Non food">NonFood</option>
          <option value="Dairy">Dairy</option>
          <option value="Frozen">Frozen</option>
        </select>

        {/* Shop selection */}
        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Choose shop
          </option>
          {shops.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default ShopInput;
