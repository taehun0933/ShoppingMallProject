import React from "react";
import useProduct from "./hooks/useProduct";
import ProductCard from "./ProductCard";

export default function ProductsViewer() {
  const {
    useProductQuery: { data, isLoading, error },
  } = useProduct();

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
