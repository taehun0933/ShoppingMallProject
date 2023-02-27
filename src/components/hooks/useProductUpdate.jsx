import { useMutation, useQuery, useQueryClient } from "react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../../api/firebase";
import { useUserContext } from "../../context/UserContext";

export default function useProductUpdate() {
  const { uid } = useUserContext();
  const CART_UID_KEY = ["carts", uid || ""];
  const useCartQuery = useQuery(CART_UID_KEY, () => getCart(uid));

  const queryClient = useQueryClient();
  const updateToCart = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CART_UID_KEY);
      },
    }
  );

  const removeItemFromCart = useMutation(
    (productId) => removeFromCart(uid, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CART_UID_KEY);
      },
    }
  );

  return { useCartQuery, updateToCart, removeItemFromCart };
}
