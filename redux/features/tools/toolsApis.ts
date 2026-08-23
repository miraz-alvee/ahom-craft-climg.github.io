import { baseApi } from "@/redux/api/baseApi";
import type {
  ToolsResponse,
} from "./types";


// ======================================================
// TOOLS API
// ======================================================

const toolsApis =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({

      // ==================================================
      // GET ALL TOOLS
      // ==================================================

      getTools:
        builder.query<
          ToolsResponse,
          void
        >({

          query: () => {

            console.log(
              "[Tools API] Fetching tools..."
            );

            return {
              url: "api/v1/tools/",
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
                "[Tools API] Tools received:",
                data
              );

              console.log(
                "[Tools API] Total tools:",
                data.count
              );

              console.log(
                "[Tools API] Tool results:",
                data.results
              );

            } catch (error) {

              console.error(
                "[Tools API] Failed to fetch tools:",
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
  useGetToolsQuery,
} = toolsApis;