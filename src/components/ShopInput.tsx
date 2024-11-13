/**
 * This is the component for the input in shoplist
 */

import { FC } from "react";

interface ShopInputProps {
  addShopItem: (item: string, priority: string, shop: string) => void;
  addShop: (shop: string) => void;
  shops: string[];
}

const ShopInput: FC<ShopInputProps> = ({ addShopItem, addShop, shops }) => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("");
  const [shopName, setShopName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
};
