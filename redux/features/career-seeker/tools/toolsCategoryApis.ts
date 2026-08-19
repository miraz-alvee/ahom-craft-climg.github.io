import { baseApi } from "@/redux/api/baseApi";

import type {
  ToolCategory,
} from "./types";


// ======================================================
// TOOLS CATEGORY API
// ======================================================

const toolsCategoryApis =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({

      // ==================================================
      // GET ALL TOOL CATEGORIES
      // ==================================================

      getToolCategories:
        builder.query<
          ToolCategory[],
          void
        >({

          query: () => {

            console.log(
              "[Tools Category API] Fetching tool categories..."
            );

            return {
              url: "api/v1/tools/categories/",
              method: "GET",
            };
          },

          async onQueryStarted(
            _,
            { queryFulfilled }
          ) {

            try {

              const {
                data,
              } = await queryFulfilled;


              console.log(
                "[Tools Category API] Categories received:",
                data
              );

            } catch (error) {

              console.error(
                "[Tools Category API] Failed to fetch categories:",
                error
              );

            }
          },

        }),

    }),
  });


// ======================================================
// EXPORT HOOK
// ======================================================

export const {
  useGetToolCategoriesQuery,
} = toolsCategoryApis;