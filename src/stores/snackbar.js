// Utilities
import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    isSnackbarOpen: false,
    title: "",
    color: "",
  }),
  actions: {
    openSnackbar(title, color) {

      this.title = title;
      this.color = color;
      this.isSnackbarOpen = true;
    }
  }
});
