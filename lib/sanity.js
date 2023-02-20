import {
    createCurrentUserHook,
    createClient
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

// setup client for fetching data in the getProps page functions
export const sanityClient = createClient(config);
/**helper function for generating Image URLs with only the asset reference data in your documents read more here https://www.sanity.io/docs/image-url */
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
//helper function for using the current logged in user account