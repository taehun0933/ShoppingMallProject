import { useQuery, useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { getProductsData, writeProductData } from "../../api/firebase";

export default function useProduct() {
  const queryClient = useQueryClient();
  const PRODUCTS_QUERY_KEY = ["products"];

  const useProductQuery = useQuery(PRODUCTS_QUERY_KEY, getProductsData, {
    staleTime: 1000 * 60,
  });

  const writeNewProductData = useMutation(
    ({ productData, imgUrl }) => writeProductData({ ...productData, imgUrl }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCTS_QUERY_KEY);
      },
    }
  );

  return { writeNewProductData, useProductQuery };
}
