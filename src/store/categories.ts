// imports
import { defineStore } from "pinia";
import { client } from "../utils/axios";

export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      try {
        const { data } = await client.get("/api/categories", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        this.categories = data.data;

        return Promise.resolve(data.data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
});
