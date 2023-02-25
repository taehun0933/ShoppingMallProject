import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useQuery } from "react-query";
import { getCart } from "../api/firebase";
import { useUserContext } from "../context/UserContext";

export default function CartStatus() {
  const { uid } = useUserContext();

  const { data: products } = useQuery(["carts"], () => getCart(uid));
  // 현재 문제 : 실시간 동기화 안됨(useQuery는 데이터가 변경되었을 때가 아닌, windowRefocus 등등에 refetch가 발생하기 때문)

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
