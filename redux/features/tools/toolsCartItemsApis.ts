import { baseApi } from "@/redux/api/baseApi";
import type { AddCartItemRequest, AddCartItemResponse, CartItemsResponse,} from "./types";


const toolsCartItemsApis =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getCartItems:
        builder.query<CartItemsResponse,void>({
          query: () => {
            console.log(
              "[Cart API] Fetching cart items..."
            );
            return {
              url: "api/v1/tools/cart-items/",
              method: "GET",
            };
          },

          async onQueryStarted(_,{ queryFulfilled }) {
            try {
              const {data} = await queryFulfilled;
              console.log(
                "[Cart API] Cart response:",
                data
              );
              console.log(
                "[Cart API] Cart items:",
                data.cart_items
              );
              console.log(
                "[Cart API] Total amount:",
                data.total_amount
              );

            } catch (error) {

              console.error(
                "[Cart API] Failed to get cart:",
                error
              );
            }
          },
          providesTags: [ "Cart",],
        }),


      // ==================================================
      // ADD TO CART
      // ==================================================

      addToCart:
        builder.mutation< AddCartItemResponse, AddCartItemRequest>({
          query: (cartData) => {
            console.log(
              "[Cart API] Adding tool to cart:",
              cartData
            );
            return {
              url: "api/v1/tools/cart-items/",
              method: "POST",
              body: cartData,
            };
          },
          async onQueryStarted(cartData, { queryFulfilled }) {
            console.log(
              "[Cart API] Add cart request:",
              cartData
            );
            try {
              const {
                data,
              } = await queryFulfilled;
              console.log(
                "[Cart API] Tool added successfully:",
                data
              );


              console.log(
                "[Cart API] New cart item:",
                data.cart_item
              );

            } catch (error) {

              console.error(
                "[Cart API] Failed to add tool to cart:",
                error
              );

            }
          },
          invalidatesTags: [ "Cart",],
        }),
    }),
  });

export const { useGetCartItemsQuery, useAddToCartMutation,} = toolsCartItemsApis;