import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useProductUpdate from "./hooks/useProductUpdate";

export default function CartStatus() {
  const { useCartQuery } = useProductUpdate();

  const { data: products } = useCartQuery;

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 font-bold bg-brand rounded-full absolute text-white -top-1 -right-2 text-center">
          {products.length}
        </p>
      )}
    </div>
  );
}
