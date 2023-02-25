import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { category, image, price, title, id, description, options } = product;
  const navigate = useNavigate();
  return (
    <li
      className="shadow-lg rounded-lg transition-all hover:scale-105"
      onClick={() => {
        navigate(`/products/${id}`, {
          state: { category, image, price, title, description, options, id },
        });
      }}
    >
      <button onClick={() => {}} className="flex flex-col w-full">
        <img src={image} alt={title} className="w-full overflow-hidden" />
        <div className="w-full p-2 flex flex-col items-start">
          <div className="flex justify-between w-full">
            <span>{title}</span>
            <span>₩{price}</span>
          </div>
          <span className="text-sm text-gray-600 mt-1">{category}</span>
        </div>
      </button>
    </li>
  );
}
