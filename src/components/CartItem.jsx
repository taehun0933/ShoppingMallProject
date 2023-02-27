import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useProductUpdate from "./hooks/useProductUpdate";

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
  uid,
}) {
  const { updateToCart } = useProductUpdate();
  const { removeItemFromCart } = useProductUpdate();
  const handleMinus = () => {
    if (quantity <= 1) return;
    updateToCart.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    updateToCart.mutate({ ...product, quantity: quantity + 1 });
  const handleDelete = () => removeItemFromCart.mutate(id);
  return (
    <li className="flex justify-between my-2 items-center">
      <img src={image} alt={title} className="w-24 md:w-48 rounded-lg mr-4" />
      <div className="flex justify-between flex-1">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>{price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare onClick={handleMinus} className={ICON_CLASS} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
          <RiDeleteBin5Fill onClick={handleDelete} className={ICON_CLASS} />
        </div>
      </div>
    </li>
  );
}
