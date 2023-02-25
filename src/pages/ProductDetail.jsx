import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../api/firebase";
import Button from "../components/ui/Button";
import { useUserContext } from "../context/UserContext";

export default function ProductDetail() {
  const { uid } = useUserContext();
  const { category, image, price, title, description, options, id } =
    useLocation().state;
  const [selected, setSelected] = useState(options && options[0]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleClick = () => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <section className="flex flex-col basis-7/12">
        <h5 className="p-4">{category}</h5>
        <img src={image} alt={title} className="px-4 max-w-xl m-auto" />
      </section>
      <section className="px-2 pt-16 flex flex-col basis-5/12">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <h2 className="text-xl font-semibold">₩{price}</h2>
        <hr className="my-4" />
        <span>{description}</span>
        <div className="flex my-5 items-center">
          <label htmlFor="size" className="mr-2">
            옵션:
          </label>
          <select
            name="sizeSelect"
            id="size"
            className="flex-auto outline-none border border-brand p-1"
            value={selected}
            onChange={handleChange}
          >
            {options &&
              options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <Button text={"장바구니에 추가"} onClick={handleClick} />
      </section>
    </div>
  );
}
