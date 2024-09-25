// import { get } from "core-js/core/dict";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useStore = defineStore("todo_items", {
  state: () => ({
    items: [],
    firstItemName: "",
    current: 0,
  }),
  getters: {
    getItems(state) {
      return state.items;
    },
    getFirstName(state) {
      return state.firstItemName;
    },
    getCurrent(state) {
      return state.current;
    }
  },
  actions: {
    async loadItems() {
      try {
        const data = api.get("/todo_items");
        this.items = (await data).data;
        this.firstItemName = this.items[0].name;
        this.current = 0;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    changeCurrentItem(id) {
      this.current = id;
    },
    // loadList() {
    // console.log(this.ItemsList);
    // await api.get("/todo_items").then((response) => {
    //   this.ItemsList = response.data;
    // });
    // },
    // async addItem(item) {
    //   await api.post("/todo-items", item);
    // },
    // async deleteItem(id) {
    //   await api.delete(`/todo-items/${id}`);
    // },
    // async updateItem(id, item) {
    //   await api.put(`/todo-items/${id}`, item);
    // },
  },
});
