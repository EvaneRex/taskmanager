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

// Defines the props
interface ShopInputProps {
  addShopItem: (
    item: string,
    department:
      | "Fruit/Vegetables"
      | "Bread"
      | "Meat"
      | "Dairy"
      | "Frozen"
      | "Non Food"
      | "Dry goods",
    shop: string
  ) => void;
  addShop: (shop: string) => void;
  shops: string[];
}

// The ShopInput component
const ShopInput: FC<ShopInputProps> = ({ addShopItem, addShop, shops }) => {
  // Defines the state variables using useState
  const [inputValue, setInputValue] = useState(""); // stores the input value for adding a new shop item
  const [shopName, setShopName] = useState(""); // stores the name of the shop to be added
  const [selectedShop, setSelectedShop] = useState(""); // store the selected shop from a dropdown or input
  const [selectedDepartment, setSelectedDepartment] = useState<
    | "Fruit/Vegetables"
    | "Bread"
    | "Meat"
    | "Dairy"
    | "Dry goods"
    | "Frozen"
    | "Non Food"
    | " " // Is the empty selection state for department
  >(" "); // default value

  // handle form submission for adding a shop item
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && selectedShop && selectedDepartment !== " ") {
      //checks the inputValue(item name), selectedShop and selectedDepartment are valid

      // Resets the form inputs after the item is added
      addShopItem(inputValue, selectedDepartment, selectedShop);
      setInputValue("");
      setSelectedShop("");
      setSelectedDepartment(" ");
    }
  };

  // handle form submission for adding a new shop
  const handleShopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shopName.trim()) {
      // Checks if shopName is not an empty string
      addShop(shopName); // calls the function to add a new shop with shopName
      setShopName(""); // clears the shop name input after the shop is added
    }
  };

  return (
    <>
      {/* Handles the submit for the shops */}
      <form onSubmit={handleShopSubmit} aria-labelledby="shop-form">
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Add shopname"
          name="shopName"
        />
        <button type="submit" aria-label="Add shop">
          Add shop
        </button>
      </form>

      {/* Handles on submit for the items */}
      <form onSubmit={handleSubmit} aria-labelledby="item-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new item"
          name="itemName"
        />

        {/* Department selection */}
        <select
          name="selectDep"
          value={selectedDepartment}
          onChange={(e) =>
            setSelectedDepartment(
              e.target.value as
                | "Fruit/Vegetables"
                | "Bread"
                | "Dry goods"
                | "Dairy"
                | "Meat"
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
          <option value="Dry goods">Dry goods</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Frozen">Frozen</option>
          <option value="Non food">Non Food</option>
        </select>

        {/* Shop selection */}
        <select
          name="selectShop"
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

        <button type="submit" aria-label="Add item">
          Add
        </button>
      </form>
    </>
  );
};

export default ShopInput;
