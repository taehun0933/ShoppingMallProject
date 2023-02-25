import React from "react";
import { useQuery } from "react-query";
import { getProductsData } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function ProductsViewer() {
  const { data, isLoading, error } = useQuery(["products"], getProductsData, {
    staleTime: 1000 * 60,
  });

  if (isLoading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <ul className="grid grid-cols-3 gap-4 my-2 px-4">
      {Object.values(data).map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </ul>
  );
}
