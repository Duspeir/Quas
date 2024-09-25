<template>
  <input v-model="input" class="" />
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";
export default {
  setup() {
    const input = ref(null);
    function GetName() {
      api.get("/todo_items").then((response) => {
        input.value = response.data[0].logs[0].string;
        return response;
      });
    }
    return { input, response: GetName() };
  },
};
</script>

<style></style>
